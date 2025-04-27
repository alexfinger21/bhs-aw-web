<script setup>
    import "@/assets/home.css"
    import Section from "@/components/Section.vue"
    import Divider from "@/components/Divider.vue"
    import Heading from "@/components/Heading.vue"

    defineProps({
        url: {
            type: String,
            default: String(new URL("../assets/imgs/bg.jpg", import.meta.url).href)
        }
    })
</script>
<template>
    <Section :imageUrl="url">
        <h1>Welcome 👋</h1>
        <div class="txt-block">
            <p>This is where you can order our handmade wooden cutting boards, coasters, etc</p>
        </div>
    </Section>
    <Heading>About us</Heading>
    <Divider></Divider>
    <Divider></Divider>
    <div class="img-grid">
    </div>

</template>
