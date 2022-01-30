<template>

    <form method='post' id='newform' name='newStage'  action=''>
        <p v-if='error.length'>
             {{ error }}
            </p>
        <p>Создать новый этап:</p>
        <p> Название: </p>
        <input type='text' name='name' v-model="name">
        <p> Описание: </p>
        <input type='text' name='descr' v-model="descr">
        <p></p>
        <p>Type: </p>
        <input type='radio' value='TEAM' name='type' id='commandType' v-model="type">
        <label for='commandType'>team</label>
        <input type='radio' value='PAIR' name='type' id='pairType' v-model="type">
        <label for='pairType'>pair</label>
        <input type='radio' value='SINGLE' name='type' id='singleType' v-model="type">
        <label for='singleType'>single</label>

        <input type="checkbox" id="mirror"  name="mirror"  value=1 v-model="attributes">
        <label for="mirror">mirror</label>

        <input type="checkbox" id="caramel"  name="caramel" value=2 v-model="attributes">
        <label for="caramel">caramel</label>

        <input type="checkbox" id="knife"  name="knife" value=3 v-model="attributes">
        <label for="knife">knife</label>

        <p></p>

        <button value="create" type="submit" name="but" @click="send">create</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: "StageForm",
    data() {
        return {
            name: "",
            descr: "",
            type: "",
            attributes:[],
            error: "",

        }
    },
    methods: {
        send(e) {
            e.preventDefault();
            const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
            if (this.check(e)) {
                axios({
                    method: 'post',
                    data: {
                        name: this.name,
                        description: this.descr,
                        type: this.type,
                        attributesIds: this.attributes
                    },
                    headers : authHeaders,
                    url: 'http://localhost:8888/stage',
                })
                .then((response) => {
                    let data = response.data;
                    console.log(data)
                    this.$emit('stageAdd', {id: data.id, name: data.name, description: data.description, type: data.type, status: data.status, attributesIds: data.attributesIds});
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        check(e) {
            this.error = "";
            if (this.name === "" || this.job === "" || this.debt === "" || this.debt < 0) {
                this.error = 'Try it again';
                console.log("here");
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