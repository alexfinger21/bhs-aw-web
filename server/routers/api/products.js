const express = require("express")
const { getDB } = require("../../db/database.js")
const router = express.Router()

router.get("/", async (req, res) => {
    const client = await getDB()
    const prods = await client.collection("products").find({}).toArray()

    console.log("PRODS", prods)
    
    res.send(prods)
})

router.get("/:id", (req, res) => {
    const p_id = req.params.id
    console.log(p_id)

    return res.send([
        "wood thing", {
            id: 0,
            sizes: {
                "small": 1,
                "big": 2,
                "huge": 3
            },
            material: {
                "wood": 1,
                "metal": 1.5
            }
        }
    ])
})

router.post("/:id/buy", (req, res) => {
    //query db, send email for now prob
})

module.exports = router
