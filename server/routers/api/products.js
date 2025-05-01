const express = require("express")
const router = express.Router

router.get("/", (req, res) => {
    return {
        "wood thing": {
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
    }
})

module.exports = router
