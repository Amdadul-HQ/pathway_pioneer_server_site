const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

// R7VTZvplvEpifys6


const uri = "mongodb+srv://rimonamdadul301:R7VTZvplvEpifys6@cluster0.p2unx4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    await client.connect();

    const database = client.db("pathwaypioneersDB");
    const countryCollection = database.collection("country");
    const touristSpotCollection = database.collection("touristSpot")

    app.get('/country',async(req,res)=>{
        const  course = countryCollection.find()
        const result = await course.toArray()
        res.send(result)
    })

    app.post('/touristspot',async (req,res)=> {
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristSpotCollection.insertOne(newTouristSpot);
      res.send(result)
    })

    app.get('/touristspot',async(req,res)=>{
      const course = touristSpotCollection.find()
      const result = await course.toArray()
      res.send(result)
    })

    app.get('/touristspot/:email',async(req,res)=>{
      const email = req.params.email;

      const filter = {
        email: email
      }
      const course = touristSpotCollection.find(filter)
      const result = await course.toArray()
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






app.get('/',(req,res)=>{
    res.send('Sever is Running')
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})