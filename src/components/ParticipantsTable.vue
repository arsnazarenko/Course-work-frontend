<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Job</th>
      <th>DateOfBirth</th>
      <th>Debt</th>
      <th>Alive</th>
    </tr>
    <ParticipantRow
      v-for="participant of participants"
      v-bind:participant="participant"
      @participantKill="participantKill"
      v-bind:contStage="contStage"
    />
  </table>
</template>

<script>
import ParticipantRow from '@/components/ParticipantRow'
import axios from "axios";
export default {
  props: ['participants', 'contStage'],
  components: {
    ParticipantRow
  },
  methods: {
    participantKill(e, id) {
        const authHeader = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
        console.log(id);
        e.preventDefault();
        axios.put('http://localhost:8888/participant/' + id + '/kill', {}, {headers: authHeader})
            .then((response) => {
                console.log(response.data);
                this.$emit('participantKill', response.data.participant);
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


