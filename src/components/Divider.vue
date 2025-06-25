<template>
  <div class="divider" :style="dividerStyle"></div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    color: {
    type: String,
    default: "var(--accent-color)" 
  },
  margin: {
    type: String,
    default: "2rem auto"
  }
})

const dividerStyle = computed(() => ({
  "background-color": props.color,
  height: props.orientation === "horizontal" ? props.thickness : "auto",
  width: props.orientation === "vertical" ? props.thickness : "100%",
  margin: props.margin
}))
</script>

<style scoped>
.divider {
  opacity: 0.6;
}
</style>
