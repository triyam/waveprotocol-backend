const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('server is up and running')
})

app.listen(5000, () => {
  console.log('Server is running at port 5000')
})
