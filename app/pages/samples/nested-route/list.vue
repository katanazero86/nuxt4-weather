<!-- /samples/nested-route/list -->

<script setup lang="ts">
const props = withDefaults(
    defineProps<{ msg?: string }>(),
    {
      msg: 'default msg'
    }
)
console.log(props.msg)
</script>

<template>
  <h2>parent - list.vue</h2>
  <p>{{ props.msg }}</p>
</template>

<style scoped>

</style>