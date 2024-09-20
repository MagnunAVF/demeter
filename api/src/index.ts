import express from 'express'
import PgFarmerRepository from './external/repository/PgFarmerRepository'
import CpfAndCnpjValidator from './external/validators/CpfAndCnpjValidator'
import Uuid from './external/shared/Uuid'
import CreateFarmerController from './external/api/CreateFarmerController'
import UpdateFarmerController from './external/api/UpdateFarmerController'
import DeleteFarmerController from './external/api/DeleteFarmerController'
import EditFarmer from './core/useCases/EditFarmer'
import CreateFarmer from './core/useCases/CreateFarmer'
import DeleteFarmer from './core/useCases/DeleteFarmer'
import Dashboard from './core/useCases/Dashboard'
import PgDashboardRepository from './external/repository/PgDashboardRepository'
import DashboardController from './external/api/DashboardController'

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
const dashboardRepository = new PgDashboardRepository()

// use cases
const createFarmer = new CreateFarmer(
  farmerRepository,
  documentValidator,
  idGenerator
)
const updateFarmer = new EditFarmer(farmerRepository, documentValidator)
const deleteFarmer = new DeleteFarmer(farmerRepository)
const dashboard = new Dashboard(dashboardRepository)

// routes and controllers
new CreateFarmerController(app, createFarmer)
new UpdateFarmerController(app, updateFarmer)
new DeleteFarmerController(app, deleteFarmer)
new DashboardController(app, dashboard)

app.listen(PORT, () => {
  console.log(`Running in http://localhost:${PORT}!`)
})
