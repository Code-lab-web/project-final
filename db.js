
const { MongoClient } = require('mongodb');

// TODO: Replace the following with your Atlas connection string
const url = "mongodb+srv://<username>:<password>@cluster0.xxxxxxxx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// The database to use
const dbName = "todos";

async function run() {
  try {
    // Connect to the Atlas cluster
    await client.connect();
    const db = client.db(dbName);

    // Make the appropriate DB calls
    // You can use the `db` object to interact with your database.
    // For example, you can create a collection and insert a document like this:
    /*
    const col = db.collection("todos");
    let todoDocument = {
        "title": "Finish MongoDB tutorial",
        "completed": false
    }
    const p = await col.insertOne(todoDocument);
    */

  } catch (err) {
    console.log(err.stack);
  }
  finally {
    await client.close();
  }
}

run().catch(console.dir);

module.exports = client;
