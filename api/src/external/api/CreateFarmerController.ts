/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import CreateFarmer from '../../core/useCases/CreateFarmer'
import CreateFarmerDto from './dtos/CreateFarmerDto'
import Crop from '../../core/models/Crop'
import Farm from '../../core/models/Farm'
import Farmer from '../../core/models/Farmer'
import CpfAndCnpjValidator from '../validators/CpfAndCnpjValidator'
import {
  FarmerExistsError,
  InvalidDocumentError,
  InvalidTotalAreaError,
} from '../../core/shared/Errors'

class CreateFarmerController {
  private transformDtoToModel(farmerData: CreateFarmerDto): Farmer {
    const crops = farmerData.farm.crops.map((cropName) => new Crop(cropName))
    const { name, city, state, totalArea, arableArea, vegetationArea } =
      farmerData.farm
    const farm = new Farm(
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      crops
    )
    const farmer = new Farmer(
      farmerData.name,
      farmerData.document,
      farm,
      new CpfAndCnpjValidator()
    )

    return farmer
  }

  constructor(server: Express, useCase: CreateFarmer) {
    server.post('/farmers', async (req, resp) => {
      try {
        const farmerData: CreateFarmerDto = req.body as CreateFarmerDto
        await useCase.execute(this.transformDtoToModel(farmerData))
        console.log(`[INFO] Farmer Created! ${JSON.stringify(farmerData)}`)

        resp.status(201).send({})
      } catch (error: any) {
        console.log(`Error Creating Farm: ${error}`)

        if (error instanceof FarmerExistsError) {
          resp.status(409).send(error.message)
        } else if (
          error instanceof InvalidTotalAreaError ||
          error instanceof InvalidDocumentError
        ) {
          resp.status(400).send(error.message)
        } else {
          resp.status(500).send('Internal Server Error')
        }
      }
    })
  }
}

export default CreateFarmerController
