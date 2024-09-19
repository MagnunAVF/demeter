/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import Crop from '../../core/models/Crop'
import Farm from '../../core/models/Farm'
import Farmer from '../../core/models/Farmer'
import CpfAndCnpjValidator from '../validators/CpfAndCnpjValidator'
import UpdateFarmerDto from './dtos/UpdateFarmerDto'
import EditFarmer from '../../core/useCases/EditFarmer'
import {
  FarmerNotExistsError,
  InvalidDocumentError,
  InvalidTotalAreaError,
} from '../../core/shared/Errors'

class UpdateFarmerController {
  private transformDtoToModel(farmerData: UpdateFarmerDto): Farmer {
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

  constructor(server: Express, useCase: EditFarmer) {
    server.put('/farmers/:document', async (req, resp) => {
      try {
        const farmerData: UpdateFarmerDto = req.body as UpdateFarmerDto
        await useCase.execute(this.transformDtoToModel(farmerData))
        console.log(`[INFO] Farmer Updated! ${JSON.stringify(farmerData)}`)

        resp.status(200).send({})
      } catch (error: any) {
        console.log(`Error Updating Farm: ${error}`)

        if (error instanceof FarmerNotExistsError) {
          resp.status(404).send(error.message)
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

export default UpdateFarmerController
