import Farmer from '../models/Farmer'
import FarmerRepository from '../repository/FarmerRepository'
import { FarmerNotExistsError } from '../shared/Errors'
import DocumentValidator from '../validators/DocumentValidator'
import UseCase from './UseCase'

class EditFarmer implements UseCase<Farmer, void> {
  constructor(
    private farmerRepository: FarmerRepository,
    private documentValidator: DocumentValidator
  ) {}

  async execute(farmer: Farmer): Promise<void> {
    const farmerExists = await this.farmerRepository.getByDocument(
      farmer.document
    )
    if (!farmerExists) {
      throw new FarmerNotExistsError()
    }

    const editedFarmer: Farmer = new Farmer(
      farmer.name,
      farmer.document,
      farmer.farm,
      this.documentValidator,
      farmer.id
    )

    this.farmerRepository.putByDocument(farmer.document, editedFarmer)
  }
}

export default EditFarmer
