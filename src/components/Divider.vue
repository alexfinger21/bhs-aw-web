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
    default: "1.5"
  }
})

const dividerStyle = computed(() => ({
  width: props.orientation === "vertical" ? props.thickness : "100%",
  height: props.margin + "em",
}))
</script>

<style scoped>
.divider {
  opacity: 0.6;
}
</style>
