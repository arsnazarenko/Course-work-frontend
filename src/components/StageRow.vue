<template>
  <tr class="row">
    <td>{{stage.id}}</td>
    <td>{{stage.name}}</td>
    <td>{{stage.description}}</td>
    <td>{{stage.type}}</td>
    <td>{{stage.status}}</td>
  </tr>
</template>

<script>
export default {
  props: {
    stage: {
      type: Object,
      required: true
    }
  }
}
</script>