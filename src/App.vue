<template>
    <div id="app">
        <!-- Top Navigation Bar -->
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <router-link to="/" class="logo">
                        <span class="artisan-name">Artisan's Workshop</span>
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
                        <h3>Artisan's Workshop</h3>
                        <p>Handcrafted with passion and dedication.</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick Links</h3>
                        <router-link to="/">Home</router-link>
                        <router-link to="/works">Gallery</router-link>
                        <router-link to="/contact">Contact</router-link>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <p>workshop@artisan.com</p>
                        <p>+1 (555) 123-4567</p>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; {{ currentYear }} Artisan's Workshop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                menuActive: false,
                currentYear: new Date().getFullYear()
            }
        },
        methods: {
            toggleMenu() {
                this.menuActive = !this.menuActive;
            }
        }
    }
</script>

<style>
/* Base Styles */
:root {
    --primary-color: #8B5A2B; /* Earthy brown */
    --secondary-color: #D2B48C; /* Tan */
    --accent-color: #A67C52; /* Darker brown */
    --light-color: #F5F5DC; /* Beige */
    --dark-color: #3E2723; /* Dark brown */
    --text-color: #333;
    --text-light: #fff;
}

#app {
    display: block;
    width: 100%;
    padding: 0;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Playfair Display', serif;
    color: var(--text-color);
    background-color: var(--light-color);
    line-height: 1.6;
}

.container {
    width: 100%;
    margin: 0 auto;
}

/* Navigation Bar */
.navbar {
    background-color: var(--dark-color);
    color: var(--text-light);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 700;
}

.artisan-name {
    font-family: 'Cormorant Garamond', serif;
}

.navbar-links {
    display: flex;
    flex-direction: column;
    background-color: var(--dark-color);
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.navbar-links.active {
    max-height: 300px;
}

.nav-link {
    color: var(--text-light);
    text-decoration: none;
    padding: 1rem;
    text-align: center;
    transition: background-color 0.3s;
}

.nav-link:hover {
    background-color: var(--accent-color);
}

.router-link-exact-active {
    background-color: var(--primary-color);
}

.menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    cursor: pointer;
}

.menu-toggle span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: var(--text-light);
    transition: all 0.3s;
}

/* Footer */
.footer {
    background-color: var(--dark-color);
    color: var(--text-light);
    padding: 2rem 0;
}

.footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section {
    margin-bottom: 1rem;
}

.footer-section h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.footer-section a {
    color: var(--secondary-color);
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
}

.footer-section a:hover {
    color: var(--text-light);
}

.copyright {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid var(--accent-color);
}

/* Responsive Design */
.navbar-brand {
    justify-content: flex-start;
}

.menu-toggle {
    display: none;
}

.navbar-links {
    position: static;
    flex-direction: row;
    max-height: none;
    width: auto;
    background-color: transparent;
}

.nav-link {
    margin-left: 1.5rem;
}

.footer-content {
    grid-template-columns: repeat(3, 1fr);
}

/* Home Page Content Styles (example) */
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae');
    background-size: cover;
    background-position: center;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    background-color: var(--primary-color);
    color: white;
    padding: 0.8rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: var(--accent-color);
}

.section {
    padding: 4rem 0;
}

.section-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: var(--primary-color);
}

/* Gallery Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* About Page Styles */
.about-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.about-image {
    border-radius: 8px;
    overflow: hidden;
}

.about-image img {
    width: 100%;
    height: auto;
}

.about-content {
    grid-template-columns: 1fr 1fr;
    align-items: center;
}
</style>
