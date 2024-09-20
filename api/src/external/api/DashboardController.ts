/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import Dashboard from '../../core/useCases/Dashboard'
import DashboardDto from './dtos/DashboardDto'

class DashboardController {
  constructor(server: Express, useCase: Dashboard) {
    server.get('/dashboard', async (req, resp) => {
      try {
        const dashboardData: DashboardDto = await useCase.execute()

        resp.status(200).send(dashboardData)
      } catch (error: any) {
        console.log(`Error in Dashboard: ${error}`)

        resp.status(500).send('Internal Server Error')
      }
    })
  }
}

export default DashboardController
