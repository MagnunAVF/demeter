import Farmer from '../models/Farmer'

interface FarmerRepository {
  create(farmer: Farmer): Promise<void>

  getById(id: string): Promise<Farmer | null>
  getByDocument(document: string): Promise<Farmer | null>

  putById(id: string, farmer: Farmer): Promise<void>
  putByDocument(document: string, farmer: Farmer): Promise<void>

  deleteById(id: string): Promise<void>
  deleteByDocument(document: string): Promise<void>
}

export default FarmerRepository
