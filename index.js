const express = require('express')
const cors = require('cors')
const { nanoid } = require('nanoid')
const stripe = require('stripe')(process.env.stripe_SECRETKEY)

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('server is up and running')
})

app.post('/payment', (req, res) => {
  const { product, token } = req.body
  const idempotencyKey = nanoid()

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price,
          currency: 'INR',
        },
        { idempotencyKey }
      )
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.log(err)
      return res.status(500).send('internal server error')
    })
})

app.listen(5000, () => {
  console.log('Server is running at port 5000')
})
