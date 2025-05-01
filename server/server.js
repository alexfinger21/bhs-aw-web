const express = require("express")
const path = require("path")
const { createSSRApp } = require("vue")
const { renderToString } = require("@vue/server-renderer")
const fs = require("fs")
const cors = require("cors")
require("dotenv").config()


//DIRS
const serverDir = "./"
const routersDir = "routers"
const apiDir = "api"

// ROUTERS
const productsRouter = require(path.resolve(serverDir, routersDir, apiDir, "products.js"))

const corsOptions = {
    origin: '*',
    credentials: true
}

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    next()
}

const app = express()

app.use(allowCrossDomain)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("req", req.path)
    next()
})

// routers

app.use("/api/products", productsRouter)

app.listen(process.env.PORT, (p) => {
    console.log("LISTENING ON PORT " + process.env.PORT)
})
