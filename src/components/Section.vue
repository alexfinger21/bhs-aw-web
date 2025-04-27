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
    default: "@/assets/imgs/bg-1.jpg", 
  },
  imageStyle: {
    type: Object,
    default: () => ({
      size: "cover",
      position: "top",
      position_y: "40%",
      repeat: "no-repeat"
    })
  }
})

const computedStyle = computed(() => ({
  backgroundImage: `url(${props.imageUrl})`, 
  backgroundSize: props.imageStyle.size,
  backgroundPosition: `${props.imageStyle.position} ${props.imageStyle.position_y}`,
  backgroundRepeat: props.imageStyle.repeat,
  backgroundPositionY: props.imageStyle.position_y,
  paddingBottom: "1rem",
}))
</script>
