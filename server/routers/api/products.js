const express = require("express")
const { getDB } = require("../../db/database.js")
const router = express.Router()

router.get("/", async (req, res) => {
    const client = await getDB()
    const prods = await client.collection("products").find({}, {projection: {_id: 0}}).toArray()

    //console.log("PRODS", prods)
    
    res.send(prods)
})

router.get("/:id", async (req, res) => {
    const p_id = req.params.id

    const client = await getDB()
    const item = await client.collection("products").findOne({id: Number(p_id)}, {projection: {_id: 0}})

    return res.send(item)
})

router.post("/:id/buy", (req, res) => {
    //query db, send email for now prob
})

module.exports = router
