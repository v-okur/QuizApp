import { MongoClient, ServerApiVersion } from 'mongodb'
const uri =
  'mongodb+srv://v-okur:1rYAJRAfHTpd2cIT@footballdb.s2poutx.mongodb.net/?retryWrites=true&w=majority&appName=FootballDB'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')

    const database = client.db('Football')
    const collection = database.collection('players')

    const newPlayer = {
      _id: 1,
      name: 'John Doe',
      position: 'Midfielder',
      team: 'FC Example',
      goals: 10
    }

    const result = await collection.insertOne(newPlayer)
  } catch (error) {
    console.error(error)
  }
}
run()
