import FarmerRepository from '../repository/FarmerRepository'
import UseCase from './UseCase'

class DeleteFarmer implements UseCase<string, void> {
  constructor(private farmerRepository: FarmerRepository) {}

  async execute(document: string): Promise<void> {
    const farmerExists = await this.farmerRepository.getByDocument(document)
    if (!farmerExists) {
      throw Error('Farmer not exists!')
    }

    this.farmerRepository.deleteByDocument(document)
  }
}

export default DeleteFarmer
