import Farmer from '../models/Farmer'
import FarmerRepository from '../repository/FarmerRepository'
import { FarmerExistsError } from '../shared/Errors'
import Id from '../shared/Id'
import DocumentValidator from '../validators/DocumentValidator'
import UseCase from './UseCase'

class CreateFarmer implements UseCase<Farmer, void> {
  constructor(
    private farmerRepository: FarmerRepository,
    private documentValidator: DocumentValidator,
    private id: Id
  ) {}

  async execute(farmer: Farmer): Promise<void> {
    const farmerExists = await this.farmerRepository.getByDocument(
      farmer.document
    )
    if (farmerExists) {
      throw new FarmerExistsError()
    }

    const newFarmer: Farmer = new Farmer(
      farmer.name,
      farmer.document,
      farmer.farm,
      this.documentValidator,
      this.id.generate()
    )

    this.farmerRepository.create(newFarmer)
  }
}

export default CreateFarmer
