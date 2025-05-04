const { MongoClient } = require("mongodb")

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

        const db = client.db("bhs-woodworking")
        return res(db)
    })
}

module.exports = {getDB}
