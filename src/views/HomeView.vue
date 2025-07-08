<template>
    <div class="home-page">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <div class="welcome-content" :style="{ backgroundImage: `url(${bgImages[0]})`}">
                <h1>Welcome 👋</h1>
                <div class="txt-block">
                    <p>Discover handcrafted wooden treasures made with passion at Beachwood High School. Each piece combines traditional craftsmanship with sustainable practices.</p>
                </div>
                <router-link to="/order" class="order-btn">Shop Now</router-link>
            </div>
        </div>

        <Divider/>

        <!-- About Section -->
        <Heading text="About Us"/>

        <Divider/>

        <Section :imageUrl="bgImages[1]" position_y="40%" class="about-section">
            <div class="txt-block">
                <p>Our woodworking program at Beachwood High School combines traditional craftsmanship with modern design. Students learn valuable skills while creating beautiful, functional pieces.</p>
                <p>We take pride in our commitment to sustainability, using locally sourced wood and environmentally friendly finishes. Every piece tells a story of skill, patience, and dedication to quality.</p>
            </div>
        </Section>

        <Divider/>

        <!-- Gallery Section -->
        <Heading text="Gallery"/>
        <div class="gallery-section">
            <div class="img-grid">
                <div 
                    v-for="(img, index) in galleryImages" 
                    :key="index" 
                    class="grid-item"
                    >
                    <img :src="img" :alt="'Gallery image ' + (index + 1)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import "@/assets/home.css"
    import Section from "@/components/Section.vue"
    import Divider from "@/components/Divider.vue"
    import Heading from "@/components/Heading.vue"

    // Sample gallery images
    const bgImages = [
        new URL("../assets/imgs/bg-1.jpg", import.meta.url).href,
        new URL("../assets/imgs/bg-2.jpg", import.meta.url).href
    ]

    const galleryImages = [
        new URL("../assets/imgs/boards-1.jpg", import.meta.url).href,
        new URL("../assets/imgs/boards-2.jpg", import.meta.url).href,
        new URL("../assets/imgs/coasters-1.jpg", import.meta.url).href,
        new URL("../assets/imgs/coasters-2.jpg", import.meta.url).href,
        new URL("../assets/imgs/cutting-board.jpg", import.meta.url).href,
        new URL("../assets/imgs/serving-tray.jpg", import.meta.url).href
    ]

</script>
