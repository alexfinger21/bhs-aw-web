<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const notification = ref({
    visible: false,
    message: "",
    link: "",
    linkText: ""
})

onMounted(async () => {
    const res = await axios.get("http://localhost:3001/api/notif/now") 
    console.log("notif", res)
    notification.value = res.data
})

function dismissNotification() {
    notification.value.visible = false
    document.querySelector(".navbar").style.top = "0"
}
</script>

<template>
    <div v-if="notification.visible" class="notification-bar">
        {{ notification.message }}
        <router-link @click="dismissNotification" :to="notification.link" class="notification-link">
            {{ notification.linkText }}
        </router-link>
        <button @click="dismissNotification" class="notification-close">×</button>
    </div>
</template>
