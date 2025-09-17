// Create, Read, Update, Delete (CRUD) operations

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(
  connectionURL,
  { useNewURLParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)
  }
)
