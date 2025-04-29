<script setup>
import { ref } from "vue"

const notification = ref({
    visible: true,
    message: "Sale coming May 32nd",
    link: "/workshop",
    linkText: "Order now →"
})

function dismissNotification() {
    notification.value.visible = false
    document.querySelector(".navbar").style.top = "0"
}
</script>

<template>
    <div v-if="notification.visible" class="notification-bar">
        {{ notification.message }}
        <router-link :to="notification.link" class="notification-link">
            {{ notification.linkText }}
        </router-link>
        <button @click="dismissNotification" class="notification-close">×</button>
    </div>
</template>
