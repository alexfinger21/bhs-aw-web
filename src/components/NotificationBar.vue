<script setup>
import { ref, onMounted, watch } from "vue"
import axios from "axios"

const empty_notif = {
    visible: false,
    message: "",
    link: "",
    linkText: ""
}

const notification = ref(empty_notif)

onMounted(async () => {
    let res = null
    try {
        res = await axios.get("http://localhost:3001/api/notif/now") 
        console.log("notif", res)
    } catch (err) {
        console.log("notif err", err)
    }
    notification.value = res?.data ?? empty_notif
})

watch(
    () => notification.value.visible,
    () => {
        if (!notification.value.visible) {
            if (document.readyState != "complete") {
                document.addEventListener("DOMContentLoaded", (event) => { 
                    document.querySelector(".navbar").style.top = "0"
                })
            } else {
                document.querySelector(".navbar").style.top = "0"
            }
        }
    },
    {immediate: true}
)

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
