// Create, Read, Update, Delete (CRUD) operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(
  connectionURL,
  { useNewURLParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('tasks').insertMany(
      [
        {
          user: 'Martin',
          task: 'Finish node.js course',
          added: new Date('11/25/2020'),
          due: new Date('12/1/2020'),
          completed: false
        },
        {
          user: 'Lexi',
          task: 'Hire some new programmers',
          added: new Date('11/20/2020'),
          due: new Date('12/31/2020'),
          completed: false
        },
        {
          user: 'Gunther',
          task: 'Fix the car',
          added: new Date('2020-11-1'),
          due: new Date('11/2/2020'),
          completed: false
        }
      ],
      (error, result) => {
        if (error) {
          return console.log('could not insert tasks')
        }
        console.log(result)
      }
    )
    db.collection('users').insertOne(
      {
        name: 'Martin',
        age: 58
      },
      (error, result) => {
        if (error) {
          return console.log('Unable to insert user')
        }
        console.log(result.ops)
      }
    )

    db.collection('user').insertMany(
      [
        {
          name: 'Gunther',
          age: 27
        },
        {
          name: 'Lexi',
          age: 25
        }
      ],
      (error, result) => {
        if (error) {
          return console.log('unable to add many')
        }
        console.log(result.ops)
      }
    )

    db.collection('users').findOne(
      { _id: new ObjectID('5fbea982a9206f29dc3f5784') },
      (error, user) => {
        if (error) {
          return console.log('unable to find user')
        }
        console.log(user)
      }
    )

    db.collection('tasks')
      .find({ completed: false })
      .toArray((error, tasks) => {
        console.log(tasks)
      })

    db.collection('tasks')
      .find({ completed: false })
      .count((error, count) => {
        console.log(count)
      })

    db.collection('users')
      .updateOne(
        { name: 'Martin' },
        {
          $set: {
            age: 58
          }
        }
      )
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })

    db.collection('tasks')
      .updateMany(
        { completed: false },
        {
          $set: {
            completed: true
          }
        }
      )
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })

    db.collection('users')
      .deleteMany({ age: 24 })
      .then(result => {
        console.log('item deleted')
      })
      .catch(error => {
        console.log('unable to delete items')
      })

    db.collection('tasks')
      .deleteOne({ task: 'Hire some new programmers' })
      .then(result => {
        console.log('item deleted')
      })
      .catch(error => {
        console.log('unable to delete items')
      })
  }
)
