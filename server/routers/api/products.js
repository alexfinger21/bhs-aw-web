const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send({
        "wood thing": {
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
    })
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

module.exports = router
