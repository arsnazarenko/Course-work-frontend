<template>

    <tr v-if = "request.reqType === 'NONE'" class="row" >
        <td>{{request.id}}</td>
        <td>{{request.name}}</td>
        <td>{{request.job}}</td>
        <td>{{request.dateOfBirth}}</td>
        <td>{{request.debt}}</td>
        <td>
            <button @click="$emit('requestAccept', $event, request.id)" class="add">+</button>
            <button @click="$emit('requestDenied', $event, request.id)" class="rm">-</button>
        </td>
    </tr>

</template>

<script>
export default {
    props: ['request'],
    name: 'RequestRow'
}

</script>


<style scoped>
.row {
    height: 27px;
    border: 2px solid #f890b6;
}
.rm {
    background: red;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
}
.add {
    background: green;
    color: #fff;
    border-radius: 50%;
    font-weight: bold;
}

</style>