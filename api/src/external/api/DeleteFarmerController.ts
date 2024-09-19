/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import DeleteFarmer from '../../core/useCases/DeleteFarmer'

class DeleteFarmerController {
  constructor(server: Express, useCase: DeleteFarmer) {
    server.delete('/farmers/:document', async (req, resp) => {
      try {
        const document: string = (req.params as any).document as string
        await useCase.execute(document)
        console.log(`[INFO] Farmer with document ${document} deleted!`)

        resp.status(204).send({})
      } catch (error: any) {
        console.log(`Error Creating Farm: ${error}`)

        resp.status(500).send('Internal Server Error')
      }
    })
  }
}

export default DeleteFarmerController
