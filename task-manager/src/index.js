require('./db/mongoose')
const express = require('express')
const keys = require('./config/keys')

const userRouter = require('./routers/UserRouter')
const taskRouter = require('./routers/TaskRouter')

const app = express()
const port = keys.port

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
