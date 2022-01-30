<template>

    <p> Начать этап: </p>
    <form method='post' action='' name='opStage'>
    <select :disabled = 'contStage' v-model="stage">
        <option v-for="stage in stages" v-bind:value="stage.id"> {{stage.id}}</option>
    </select>
    <button :disabled = 'contStage' value="start" type="submit" name="but" @click="send">start</button>
    </form>
    <p></p>
    <p> Закончить этап: </p>
    <p v-if='error.length'>
        {{ error }}
    </p>
    <form method='put' action='' name='closeStage' >
        <button value="close" type="submit" @click="end">end</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
    name: "StageManage",
    props: ['stages', 'contStage'],
    data() {
        return {
            stage: "",
            error: ""
        }
    },
    methods: {
        send(e){
            e.preventDefault();
            const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
            axios.put('http://localhost:8888/stage/' + this.stage + '/start',  {
                teams: []
            }, { headers: authHeaders }
            )
                .then((response) => {
                    console.log(response.data);
                    this.$emit('stageStart', response.data);
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        end(e){
            e.preventDefault();
            const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};

            axios.put('http://localhost:8888/stage/end',  {
            }, {headers:authHeaders})
                .then((response) => {
                    console.log(response.data);
                    this.$emit('stageEnd', response.data);
                })
                .catch((error) => {
                    this.error = "try it again"
                    console.log(error)
                });
        }
    }

}
</script>

<style scoped>

</style>