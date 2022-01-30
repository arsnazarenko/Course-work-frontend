<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>DESCRIPTION</th>
      <th>TYPE</th>
      <th>STATUS</th>
    </tr>
    <StageRow
        v-for="stage of stages"
        v-bind:stage="stage"
    />
  </table>
</template>

<script>
import StageRow from '@/components/StageRow'
export default {
 // name: "StageTable",
  props: ['stages'],
  components: {
    StageRow
  },
}
</script>

<style scoped>
table{
    table-layout:fixed;
    overflow:hidden; }
</style>