const express = require("express");
const app = express()
const cors = require("cors")

const assert = require("assert")

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = "mongodb+srv://vaishu:vaishu@cluster0.qskmh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const aggregate = mongodb
let options = { origin: "*" }
app.use(cors(options))
app.use(express.json())
app.get("/user/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let objId = mongodb.ObjectId(req.params.id)
        let a = await db.collection("users").findOne({ _id: objId })
        await connection.close()
        res.json(a)
    } catch (error) {
        console.log(error)
    }
})

app.post("/userpost", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let b = await db.collection("users").insertOne(req.body)
        await connection.close()
        res.json({ message: "user-added" })
    } catch (error) {
        console.log(error)
    }
})

app.put("/userput/:id", async function (req, res) {
    try {
        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let objId = mongodb.ObjectId(req.params.id)
        let a = await db.collection("users").findOneAndUpdate({ _id: objId }, { $set: req.body })
        await connection.close()
        res.json({ message: "data-updated" })
    } catch (error) {
        console.log(error)
    }
})


app.get("/userall", async function (req, res) {
    try {

        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let b = await db.collection("users").find({}).toArray()
        await connection.close()
        res.json(b)
    } catch (error) {
        console.log(error)
    }
})

// app.get("/sum", async function(req,res){
//     try{

//         let connection= await mongoClient.connect(URL)

//         let db= connection.db("moneymanager")
//        let dbs= await db.collection("users").aggregate([
//            {
//                $match:{income:{"$gt":100000}}

//            }
//         //    {$group:{ total:{$sum:"$income"}}}
//        ])

//         await connection.close()
//         res.json(dbs)
//     }catch(error){
//         console.log(error)
//     }
// })

// app.get("/sumexpenses", async function (req, res) {
//     try {
//         let connection = await mongoClient.connect(URL)
//         let db = connection.db("moneymanager")
//         let objId= mongodb.ObjectId(req.body.income)
//        // let a= await db.collection("users").find({},{income:1})
//        let a= db.users.aggregate([
//             { $match: { status: "A" } },
//             { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
//             { $sort: { total: -1 } }
//           ])


//       await connection.close()
//         res.json(a)
//     } catch (error) {
//         console.log(error)
//     }
// })

app.get("/date", async function (req, res) {
    try {

        let connection = await mongoClient.connect(URL)
        let db = connection.db("moneymanager")
        let c = db.collection("users").aggregate([
            {
                $match:
                    { date: { "$gt": "2022", "$lt": "2023" } }
            },
            {
                $group:
                    { _id: null, total: { $sum: "$income" } }
            }
        ])





        await connection.close()
        res.json(c)
    } catch (error) {
        console.log(error)
    }
})




app.listen(process.env.PORT || 4000)