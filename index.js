const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p2unx4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const database = client.db("pathwaypioneersDB");
    const countryCollection = database.collection("country");
    const touristSpotCollection = database.collection("touristSpot")

    app.get('/country',async(req,res)=>{
        const  cursor = countryCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.post('/touristspot',async (req,res)=> {
      const newTouristSpot = req.body;
      console.log(newTouristSpot);
      const result = await touristSpotCollection.insertOne(newTouristSpot);
      res.send(result)
    })

    app.get('/touristspot/:id',async(req,res)=>{
      const id = req.params.id;
      const qurey = {
        _id: new ObjectId(id)
      }
      const result = await touristSpotCollection.findOne(qurey)
      res.send(result)
    })

    app.get('/touristspot',async(req,res)=>{
      const cursor = touristSpotCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/touristspotCountry/:country',async(req,res)=>{
      const countryName = req.params.country;
      console.log(countryName);
      const filter = {
        country: countryName
      }
      console.log(filter);
      const cursor = touristSpotCollection.find(filter)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/touristspotEmail/:email',async(req,res)=>{
      const email = req.params.email;

      const qurey = {
        email: email
      }
      const cursor = touristSpotCollection.find(qurey)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.put('/touristspot/:id',async(req,res)=>{
      const id  = req.params.id;
       console.log(id);
       const updateSpot = req.body
       const filter = {
        _id : new ObjectId(id)
       }
       const options = { upsert: true };
      //  country,tourists_spot_name,,average_cost,email,userName
       const spot ={
        $set:{
          country:updateSpot.updatecountry,
          tourists_spot:updateSpot.updatetourists_spot_name,
          spot_location:updateSpot.updatespot_location,
          short_description:updateSpot.updateshort_description,
          bordered_radio:updateSpot.updatebordered_radio,
          totalVisitorsPerYear:updateSpot.updatetotalVisitorsPerYear,
          photourl:updateSpot.updatephotourl,
          travel_time:updateSpot.updatetravel_time,
          average_cost:updateSpot.updateaverage_cost,
          email:updateSpot.updateemail,
          userName:updateSpot.updateuserName
        }
       }
       const result = await touristSpotCollection.updateOne(filter,spot,options)
       res.send(result)
    })

    app.delete('/touristspot/:id',async(req,res)=>{
      const id = req.params.id;
      const qurey = {
        _id: new ObjectId(id)
      }
      const result = await touristSpotCollection.deleteOne(qurey)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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