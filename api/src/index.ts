import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  res.status(200).send({ msg: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}!`)
})
