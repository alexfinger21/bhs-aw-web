<template>
    <div 
        class="img-section"
        :style="computedStyle"
    >
        <slot></slot>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

const props = defineProps({
  imageUrl: {
    type: String,
    default: "@/assets/imgs/bg-1.jpg" 
  },
  position_y: {
    type: String,
    default: "40%"
  },
  size: {
    type: String,
    default: "cover"
  },
  imageStyle: {
    type: Object,
    default: () => ({
      position: "top",
      repeat: "no-repeat"
    })
  }
})

const computedStyle = computed(() => ({
  backgroundImage: `url(${props.imageUrl})`, 
  backgroundSize: props.size,
  backgroundPosition: `${props.imageStyle.position} ${props.imageStyle.position_y}`,
  backgroundRepeat: props.imageStyle.repeat,
  backgroundPositionY: props.position_y,
  paddingBottom: "1rem",
}))
</script>
