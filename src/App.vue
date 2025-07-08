<template>
    <transition name="slide-fade">
    <div v-if="notif.visible" class="success-notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>{{notif.text}}</span>
    </div>
    </transition>

    <div id="app-v">
        <NotificationBar/>
        <!-- Top Navigation Bar -->
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/" class="logo">
                        <img class="heading-img" src="./assets/imgs/logo.png"/>
                        <p class="artisan-name">BHS Artisanal Works</p>
                    </router-link>
                    <div class="navbar-right">
                        <router-link to="/cart" class="cart-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </router-link>
                        <div class="menu-toggle" @click="toggleMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="navbar-links" :class="{ 'active': menuActive }">
                    <router-link to="/" class="nav-link" @click="navClick">Home</router-link>
                    <router-link to="/order" class="nav-link" @click="navClick">Order</router-link>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main>
            <router-view>
            </router-view>
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3 class="title">BHS Woodworking</h3>
                        <p>Made with 💗 by BHS Woodworking</p>
                    </div>
                    <div class="footer-section">
                        <h3 class="title">Quick Links</h3>
                        <router-link to="/">Home</router-link>
                        <router-link to="/order">Order</router-link>
                        <router-link to="/cart">Cart</router-link>
                    </div>
                    <div class="footer-section">
                        <h3 class="title">Contact</h3>
                        <p>workshop@artisan.com</p>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </div>
                <div class="copyright">
                    <p class="title">BHS Artisanal Works</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
    import NotificationBar from "./components/NotificationBar.vue"
    import { ref } from 'vue'
    import { useSelector } from "@reduxjs/vue-redux"

    const notif = useSelector(state => state.notif)
    console.log(notif.value)

    const menuActive = ref(false)
    
    const toggleMenu = () => {
        menuActive.value = !menuActive.value
    }

    const navClick = () => {
        menuActive.value = false
    }
</script>
