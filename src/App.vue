<template>
    <div id="app-v">
        <!-- Top Navigation Bar -->
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/" class="logo">
                        <p class="artisan-name">BHS Artisanal Works</p>
                    </router-link>
                    <div class="menu-toggle" @click="toggleMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-links" :class="{ 'active': menuActive }">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/about" class="nav-link">About</router-link>
                    <router-link to="/works" class="nav-link">Works</router-link>
                    <router-link to="/workshop" class="nav-link">Workshop</router-link>
                    <router-link to="/contact" class="nav-link">Contact</router-link>
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
                        <h3 class="title">Artisan's Workshop</h3>
                        <p>Handcrafted with passion and dedication.</p>
                    </div>
                    <div class="footer-section">
                        <h3 class="title">Quick Links</h3>
                        <router-link to="/">Home</router-link>
                        <router-link to="/products">Products</router-link>
                        <router-link to="/order">Order</router-link>
                    </div>
                    <div class="footer-section">
                        <h3 class="title">Contact</h3>
                        <p>workshop@artisan.com</p>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </div>
                <div class="copyright">
                    <p class="title">BHS Artisan Works</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
</script>
