const { MongoClient } = require("mongodb")

// to do : add online mongodb client
const adminUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/admin?authSource=admin`
let client = null

function getConnection() {
    return new Promise(async (res, rej) => {
        if (client) {
            return res(client)
        }

        const db_client = new MongoClient(adminUri, {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000
        })

        await db_client.connect()
        client = db_client
        return res(client)
    })
}

function getDB() {
    return new Promise(async (res, rej) => {
        const db_client = await getConnection()

        const db = db_client.db("bhs-woodworking")

        /* 
        const result = await db.collection("products").insertOne({
            name: "Cutting Board", 
            id: 0, 
            starting_p: 15,
            sizes: {"small": 0, "medium": 2 , "large": 4}
        })

        console.log(result)
        */ 

        return res(db)
    })
}

module.exports = {getDB}
