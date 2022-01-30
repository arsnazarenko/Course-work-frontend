<template>

    <form method='post' action='' name='newPart' >
        <p v-if='error.length'>
             {{ error }}
             </p>
        <p>Add new participant of game</p>
        <p>Name: <input name='name' v-model="name"></p>
        <p>Job: <input name='job' v-model="job"></p>
        <p>Debt: <input name='debt' type='number' v-model="debt"></p>
        <p>Date of birth: <input type='date' name='date' max='2022-01-24' v-model="date"></p>
        <input type='submit' value='send' @click='send'>
    </form>

</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: "",
            job: "",
            debt: 0,
            date: "",
            error: "",
        }
    },
    methods: {
        send(e) {
            if (this.check(e)) {
                e.preventDefault();
                const authHeaders = {Authorization: "Bearer " + localStorage.getItem('jwt')};
                axios.post(
                    'http://localhost:8888/participant',

                    {
                        name: this.name,
                        job: this.job,
                        dateOfBirth: this.date,
                        debt: parseInt(this.debt)
                        },
                    { headers: authHeaders}
                    )
                    .then((response) => {
                        console.log(response.data);
                        this.$emit('participantAdd', response.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }
        },

        check(e) {
            this.error = "";
            if (this.name === "" || this.job === "" || this.debt === "") {
                this.error = 'Try it again';
                console.log("here");
                //e.preventDefault();
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>

<style>

</style>