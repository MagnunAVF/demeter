import serverless from 'serverless-http'
import express from 'express'
import PgFarmerRepository from './src/external/repository/PgFarmerRepository'
import CpfAndCnpjValidator from './src/external/validators/CpfAndCnpjValidator'
import Uuid from './src/external/shared/Uuid'
import CreateFarmerController from './src/external/api/CreateFarmerController'
import UpdateFarmerController from './src/external/api/UpdateFarmerController'
import DeleteFarmerController from './src/external/api/DeleteFarmerController'
import EditFarmer from './src/core/useCases/EditFarmer'
import CreateFarmer from './src/core/useCases/CreateFarmer'
import DeleteFarmer from './src/core/useCases/DeleteFarmer'

const app = express()

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
const updateFarmer = new EditFarmer(farmerRepository, documentValidator)
const deleteFarmer = new DeleteFarmer(farmerRepository)

// routes and controllers
new CreateFarmerController(app, createFarmer)
new UpdateFarmerController(app, updateFarmer)
new DeleteFarmerController(app, deleteFarmer)

// lambda wrapper
export const main = serverless(app)
