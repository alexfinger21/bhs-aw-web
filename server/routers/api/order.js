const express = require("express")
const { getDB } = require("../../db/database")
const router = express.Router()

router.post("/", async (req, res) => {
    const client = await getDB()
    if (req.body?.cart && req.body.cart.length) {
        const insertRes = await client.collection("orders").insertOne({
            cart: req.body.cart, 
            email: req.body?.email
        })

        console.log(insertRes)
        if (insertRes.acknowledged) {
            res.send({"success": true})
        } else {
            res.send({"success": false})
        }
    }
})

module.exports = router
