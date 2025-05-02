const express = require("express")
const router = express.Router()
const Notification = require("../../modules/Notification.js")

router.get("/now", (req, res) => { 
    res.send(new Notification({
        visible: true, 
        message: "Sale Coming May 32nd",
        link: "/order",
        linkText: "Order now →" 
    }))
})

module.exports = router
