<template>
    <div class="home-page">
        <!-- Welcome Section -->
        <div class="welcome-section">
            <div class="welcome-content" :style="{ backgroundImage: `url(${bgImages[0]})`}">
                <h1>Welcome to BHS Artisanal Woodworking!</h1>
                <div class="txt-block">
                    <p>Discover handmade and customizable cutting boards, coasters, engraved mugs, coffee cups, and rustic signs made with sustainable practices.</p>
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
                <p>We’re two seniors from Beachwood High School who turned a classroom project into a growing business. Founded in our Design & Engineering class last year, BHS Artisanal Woodworking started with a simple idea: take scraps of wood from the school woodshop and transform them into something beautiful and useful.</p>
                <p>Our first products, handcrafted cutting boards, showed us that even leftover pieces could become something lasting with creativity and care. What began as a small project quickly grew into something bigger: a way to inspire and involve other young people. Along the way, we’ve invited students to join us in learning about the engineering design process, developing woodworking skills, and even coding this very website. </p>
                <p>For us, woodworking is about creating opportunities, building community, and showing what’s possible when young entrepreneurs take a chance on their ideas.</p>
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
        new URL("../assets/imgs/namaste-1.jpg", import.meta.url).href,
        new URL("../assets/imgs/shoe-jack-1.jpg", import.meta.url).href,
        new URL("../assets/imgs/coasters-2.jpg", import.meta.url).href,
        new URL("../assets/imgs/cutting-board.jpg", import.meta.url).href,
        new URL("../assets/imgs/serving-tray.jpg", import.meta.url).href
    ]

</script>
