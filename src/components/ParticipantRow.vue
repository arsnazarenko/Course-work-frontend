<template>
  <tr class="row" v-if="participant.isAlive">
    <td>{{participant.id}}</td>
    <td>{{participant.name}}</td>
    <td>{{participant.job}}</td>
    <td>{{participant.dateOfBirth}}</td>
    <td>{{participant.debt}}</td>
    <td >{{participant.isAlive}}</td>
    <td>
      <button v-if="contStage" @click="$emit('participantKill', $event, participant.id)" class="rm">&times;</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    participant: {
      type: Object,
      required: true
    },
    contStage: {type: Boolean}
  }
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
</style>