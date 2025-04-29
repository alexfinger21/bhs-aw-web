const express = require("express")
const { createSSRApp } = require("vue")
const { renderToString } = require("@vue/server-renderer")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const app = express()
