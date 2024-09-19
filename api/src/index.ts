import express from 'express'
import PgFarmerRepository from './external/repository/PgFarmerRepository'
import CpfAndCnpjValidator from './external/validators/CpfAndCnpjValidator'
import CreateFarmer from './core/useCases/CreateFarmer'
import Uuid from './external/shared/Uuid'
import CreateFarmerController from './external/api/CreateFarmerController'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  res.status(200).send({ msg: 'OK' })
})

// adapters
const idGenerator = new Uuid()
const documentValidator = new CpfAndCnpjValidator()
const farmerRepository = new PgFarmerRepository(documentValidator)

// use cases
const createFarmer = new CreateFarmer(
  farmerRepository,
  documentValidator,
  idGenerator
)

// routes and controllers
new CreateFarmerController(app, createFarmer)

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}!`)
})
