import express from "express";
import cors from 'cors'
import { MongoClient } from "mongodb";
import 'dotenv/config'


const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('aquariums')
const parks = database.collection('parks')

client.connect()
console.log('Connected to mongoDB')
const PORT = 4001

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('API is running on', PORT))

//                   ********CRUD********

//        GET
app.get('/', async (req, res) => {
  const allAquariums = await parks.find().toArray()
  res.send(allAquariums)
  console.log(allAquariums)
})

//        POST
app.post('/', async (req, res) => {
  await parks.insertOne(req.body)
  res.send('Park added')
})

//        PUT
app.put('/', async (req, res) => {
  await parks.findOneAndUpdate(req.query, {$set: req.body})
  res.json('Park was updated')
})

//        DELETE
app.delete('/', async (req,res) => {
  await parks.findOneAndDelete(req.query)
  res.json('Park was deleted')
})