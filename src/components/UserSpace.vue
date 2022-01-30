<template>
    <p v-if='msg.length'>
        {{ msg }}
    </p>
    <div v-if="request>0">
    </div>
    <div v-if="request===0">
        <form method='post' action='' name='newPart'>
            <p v-if='error.length'>
                {{ error }}
            </p>
            <p>Become a participant: </p>
            <p>Name: <input name='name' v-model="name"></p>
            <p>Job: <input name='job' v-model="job"></p>
            <p>Debt: <input name='debt' type='number' v-model="debt"></p>
            <p>Date of birth: <input type='date' name='date' max='2022-01-24' v-model="date"></p>
            <input type='submit' value='send' @click='send'>
        </form>
    </div>
    <button @click="logout" id="tmp"> logout </button>
</template>

<script>
import axios from "axios";

export default {
    name: "UserSpace",
    data() {
        return {
            name: "",
            job: "",
            debt: 0,
            date: "",
            error: "",
            request: 0,
            msg: "",
            requestData: {}
        }
    },
    mounted() {
        const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
        let userID = localStorage.getItem('id');
        axios.get('http://localhost:8888/participant_request/user/' + userID, {headers: authHeaders})
            .then(resp => {
                console.log('here in mounted')
                console.log(resp.data);
                if (resp.data.reqType === 'DENIED') {
                        this.msg = "Your request is not accepted";
                        this.request = 1;
                    } else if (resp.data.reqType === 'ACCEPTED') {
                        this.request = 1;
                        this.msg = "Your request is accepted"
                    } else {
                        this.request = 1;
                        this.msg = "Your request is pending"
                    }

                }
            )
            .catch((err) => {
                this.request = 0;
            });
    },
    methods: {
        send(e) {
            if (this.check(e)) {
                e.preventDefault();
                const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
                axios.post(
                    'http://localhost:8888/participant_request',
                    {
                        name: this.name,
                        job: this.job,
                        dateOfBirth: this.date,
                        debt: parseInt(this.debt),
                        userId: localStorage.getItem('id')
                    },
                    {headers: authHeaders}
                )
                    .then((response) => {
                        console.log(response.data);
                        this.request = 1;
                        this.msg = "Your request is pending"
                        // this.$emit('participantAdd', response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },
        logout(){
            localStorage.clear();
            this.$router.push('Login');
        },

        check(e) {
            this.error = "";
            if (this.name === "" || this.job === "" || this.debt === "") {
                this.error = 'Try it again';
                console.log("here");
                e.preventDefault();
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style scoped>

</style>