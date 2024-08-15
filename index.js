//https://b9-a-10-ceramics-pottery-server-4lx8.vercel.app/
const express = require('express')
const cors = require("cors")
require('dotenv').config()
// console.log(process.env)

const app = express()
const port = process.env.PORT || 3000


//middleware
app.use(cors())
app.use(express.json())

//potteryCeramicsUser_09
//dWTkiJ9ZH1m8PTiU

console.log(process.env.db_user)
console.log(process.env.db_pw)

app.get('/', (req, res) => {
  res.send('Hello World!enJoy Express JS.I am an Expret of MERN Stack developer.try to be expert as a backend developer')
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = "mongodb+srv://potteryCeramicsUser_09:dWTkiJ9ZH1m8PTiU@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pw}@cluster0.hfhifix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const potteryCeramicsDB = client.db("poteryCeramicsDB").collection("potteryCeramics")
    const usersCeramicsCollection = client.db("poteryCeramicsDB").collection("potteryUsers")

    //pottery_ceramics related API
    //CREATE
    app.post("/addPotteryCeramics",async(req,res)=>{
      const newPotteryCeramics = req.body
      console.log(newPotteryCeramics)
      const result = await potteryCeramicsDB.insertOne(newPotteryCeramics);
      console.log(result)
      res.send(result)
    })

    //READ
    app.get("/myPotteryCeramics",async(req,res)=>{
      const cursor = await potteryCeramicsDB.find().toArray();
      console.log(cursor)
      res.send(cursor)
    })


    //DELETE
    app.delete("/myPotteryCeramics/:_id",async(req,res)=>{
      const _id = req.params._id
      console.log(_id)
      const query = { _id: new ObjectId(_id )};
      const result = await potteryCeramicsDB.deleteOne(query);
      console.log(result)
      res.send(result)
    })


    //UPDATE
    app.get("/myPotteryCeramics/:_id",async(req,res)=>{
      const _id = req.params._id
      console.log(_id)
      const query = { _id: new ObjectId(_id )};
      const result = await potteryCeramicsDB.findOne(query)
      console.log(result)
      res.send(result)
    })

    app.put(`/updatePotteryCeramics/:_id`,async(req,res)=>{
      const _id = req.params._id
      const filter = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updatePotteryCeramics = req.body
      const PotteryCeramics = {
        $set: {
          name:updatePotteryCeramics.name,
          quantity:updatePotteryCeramics.quantity,
          supplier:updatePotteryCeramics.supplier,
          photo:updatePotteryCeramics.photo,
          description:updatePotteryCeramics.description,
          price:updatePotteryCeramics.price,
          status:updatePotteryCeramics.status,
          rating:updatePotteryCeramics.rating,
        },
      };
      const result = await potteryCeramicsDB.updateOne(filter, PotteryCeramics, options);
      console.log(result)
      res.send(result)
    })


    //users related API
    //CREATE
    app.post("/createUser",async(req,res)=>{
      const user = req.body
      console.log(user)
      const result = await usersCeramicsCollection.insertOne(user);
      console.log(result)
      res.send(result)
    })

    //READ
    app.get("/getAllUser",async(req,res)=>{
      const result = await usersCeramicsCollection.find().toArray();
      console.log(result)
      res.send(result)
    })

    //DELETE
    app.delete(`/deleteAUser/:_id`,async(req,res)=>{
      const _id = req.params._id
      const query = { _id: new ObjectId(_id)};
      const result = await usersCeramicsCollection.deleteOne(query);
      console.log(result)
      res.send(result)
    })


    //UPDATE
    app.get(`/getOneUser/:_id`,async(req,res)=>{
      const _id = req.params._id
      console.log(_id)
      const query = { _id: new ObjectId(_id )};
      const result = await usersCeramicsCollection.findOne(query)
      console.log(result)
      res.send(result)
    })

    app.put(`/updateOneUser/:_id`,async(req,res)=>{
      const _id = req.params._id
      const filter = { _id: new ObjectId(_id) };
      const options = { upsert: true };
      const updateUsers = req.body
      const users = {
        $set: {
          email:updateUsers.email,
          username:updateUsers.username,
          password:updateUsers.password,
          photo:updateUsers.photo,
        },
      };
      const result = await usersCeramicsCollection.updateOne(filter, users, options);
      console.log(result)
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
    console.log(`Example app listening on port ${port}`)
})