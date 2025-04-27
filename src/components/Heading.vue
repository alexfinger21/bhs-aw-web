<template>
    <h2 class="heading">{{ text }}</h2>
</template>

<script setup>

const props = defineProps({
    text: {
       type: String,
       required: true
    }
})

</script>
