<template>
    <body>
    <div id='divid'>
        <h1><img src="https://fontmeme.com/permalink/220125/61d5c8bdcdbf8ca24756c7814033a892.png"></h1>
        <button @click="logout"> logout </button>
        <p></p>
        <div class="navbar">
            <div @click="participantOn" ><img src="https://fontmeme.com/permalink/220125/13405973bdc72507a3f567c0f9ba5f07.png"></div>
            <div @click="stagesOn" ><img src="https://fontmeme.com/permalink/220125/fdbd2af942f1b7e3d786912636ab6c03.png"></div>
            <div @click="requestOn"><img src="https://fontmeme.com/permalink/220125/3b99ecef15aa47d125b12dcb22b4a27e.png"></div>
        </div>
        <div v-if="component===1">
            <ParticipantForm  @participantAdd="participantAdd"/>
            <ParticipantsTable v-bind:participants="participants" v-bind:contStage="contStage" @participantKill="participantKill"/>
        </div>
        <div v-if="component===2">
            <StageManage
                @stageStart="stageStart" @stageEnd="stageEnd" v-bind:stages="stages.filter((s) => s.status !== 'END' && s.status !== 'CONTINUOUS')"
                v-bind:contStage="contStage"
            />
            <StageForm @stageAdd="stageAdd"/>
            <StageTable v-bind:stages="stages"/>
        </div>
        <div v-if="component===3">
        <RequestTable v-bind:requests="requests" @requestAccept="requestAccept" @requestDenied="requestDenied" />
        </div>

    </div>
    </body>
</template>

<script>
import ParticipantsTable from '@/components/ParticipantsTable'
import StageTable from "@/components/StageTable";
import ParticipantForm from "@/components/ParticipantForm";
import StageForm from "@/components/StageForm";
import StageManage from "@/components/StageManage";
import axios from "axios";
import RequestTable from "@/components/RequestTable";


export default {
    name: 'Game',
    data() {
        return {
            participants: [],
            stages: [],
            requests: [],
            contStage: false,
            component: 1,
        }
    },
    mounted() {
        const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
        axios.get('http://localhost:8888/stage/', {headers: authHeaders} )
            .then(resp => {
                let map = resp.data.map(s => { return {
                    id: s.id,
                    name: s.name,
                    description: s.description,
                    type: s.type,
                    status: s.status,
                    attributesIds: s.attributesIds
                };
                });
                let contStage = map.find(s => s.status === 'CONTINUOUS');
                if (contStage) {
                    this.contStage = true;
                }
                this.stages = map;
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:8888/participant', {headers: authHeaders} )
            .then(responce => this.participants = responce.data)
            .catch(err => console.log(err))

        axios.get('http://localhost:8888/participant_request', {headers: authHeaders} )
            .then(responce => {
                this.requests = responce.data;
                console.log(this.requests);
            })
            .catch(err => console.log(err))
    },

    components: {
        RequestTable,
        StageManage,
        StageForm,
        StageTable,
        ParticipantsTable,
        ParticipantForm
    },

    methods: {
        participantOn() {
            this.component = 1;
        },
        stagesOn() {
            this.component = 2;
        },
        requestOn() {
            this.component = 3;
        },
        participantKill(killData) {
            let killedId = killData.id;
            console.log(killedId);
            let findPart = this.participants.find((e) => e.id === killedId)
            findPart.isAlive = false;
        },
        participantAdd(partData) {
            console.log(partData);
            this.participants.push(partData);
        },
        stageAdd(stageData) {
            this.stages.push(stageData);
        },
        stageStart(stage) {
            let foundStage = this.stages.find(s => s.id === stage.id);
            foundStage.status = 'CONTINUOUS';
            this.contStage = true;
        },
        stageEnd(stage) {
            let foundStage = this.stages.find(s => s.id === stage.id);
            foundStage.status = 'END';
            this.contStage = false;
        },
        logout(){
            localStorage.clear();
            this.$router.push('Login');
        },
        requestAccept(requestData) {
            let acceptedId = requestData.id;
            let newPart = requestData.participant;
            this.participantAdd(newPart);
            let findReq = this.requests.find((e) => e.id === acceptedId)
            findReq.reqType = 'ACCEPTED';

        },
        requestDenied(requestData){
            let acceptedId = requestData.id;
            let findReq = this.requests.find((e) => e.id === acceptedId);
            console.log(findReq);
            findReq.reqType = 'DENIED';
        }


        }

}
</script>

<style>

body {
    background: black;
}
p {
    color:white;
}
label {
    color: white;
}
td {
    height: 33px;
    font-size: 17px;
    border-left: 2px solid #f890b6;
    border-right: 2px solid #f890b6;
    border-top: 2px solid #f890b6
}
table{
    height: 27px;
    border-collapse:collapse;
    width: 100%;
    table-layout:fixed;
    overflow: hidden;
    color: white;
}

.navbar {
    padding: 2%;
    width: 100%;
    height: 20%;
}

.navbar div {
    float: left;
    width: 33%;
}

.on {
    color: red;
}

.off {
    color: green;

}
</style>
