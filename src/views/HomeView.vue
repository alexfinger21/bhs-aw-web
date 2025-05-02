<script setup>
    import "@/assets/home.css"
    import Section from "@/components/Section.vue"
    import Divider from "@/components/Divider.vue"
    import Heading from "@/components/Heading.vue"


    defineProps({
        url1: {
            type: String,
            default: String(new URL("../assets/imgs/bg-1.jpg", import.meta.url).href)
        },
        url2: {
            type: String,
            default: String(new URL("../assets/imgs/bg-2.jpg", import.meta.url).href)
        }
    })
</script>
<template>
    <Divider/>
    <Section :imageUrl="url1">
        <h1>Welcome 👋</h1>
        <div class="txt-block">
            <p>This is where you can order our handmade wooden cutting boards, coasters, etc bla bla bla baboom web words a loit more words and things</p>
        </div>
    </Section>
    <Heading text="About Us"/>
    <Divider/>
    <Section :imageUrl="url2" position_y="40%">
        <div class="txt-block">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </Section>
    <Heading text="Gallery"/>
    <Divider/>
    <Section :imageUrl="url2" position_y="40%">
        <div class="img-grid">
            <img class="grid-item" src="@/assets/imgs/boards-1.jpg"></img> 
        </div>
    </Section>

</template>
