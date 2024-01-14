<template>
  <div
    v-if="modelValue"
    class="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600"
  />
</template>
<script lang="ts">
export default {
  name: "Loading",
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>
