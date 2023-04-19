const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')


app.use(cors())

// Available routes

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/About', (req, res) => {
//   res.send('About us')
// })

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})