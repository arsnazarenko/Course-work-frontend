<template>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job</th>
            <th>DateOfBirth</th>
            <th>Debt</th>
        </tr>
        <RequestRow
            v-for="request of requests"
            v-bind:request="request"
            @requestAccept="requestAccept"
            @requestDenied="requestDenied"
        />
    </table>
</template>

<script>
import RequestRow from "@/components/RequestRow";
import axios from "axios";

export default {
    props: ['requests'],
    components: {
        RequestRow
    },
    name: "RequestTable",

    methods: {
        requestAccept(e, id) {
            const authHeader = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
            console.log(id);
            e.preventDefault();
            axios.put('http://localhost:8888/participant_request/' + id + '/accept', {}, {headers: authHeader})
                .then((response) => {
                    console.log(response.data);
                    this.$emit('requestAccept', {id: id, participant: response.data});
                })
                .catch((error) => {
                    console.log(error)
                });
        },

        requestDenied(e, id) {
            const authHeader = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
            console.log(id);
            e.preventDefault();
            axios.put('http://localhost:8888/participant_request/' + id + '/denied', {}, {headers: authHeader})
                .then((response) => {
                    console.log(response.data);
                    this.$emit('requestDenied', {id: id, participant: response.data});
                })
                .catch((error) => {
                    console.log(error)
                });
        }

    }

}
</script>

<style>
table{
    table-layout:fixed;
    overflow:hidden; }
</style>