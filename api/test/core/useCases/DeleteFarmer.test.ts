import Crop from '../../../src/core/models/Crop'
import Farm from '../../../src/core/models/Farm'
import Farmer from '../../../src/core/models/Farmer'
import FarmerRepository from '../../../src/core/repository/FarmerRepository'
import { FarmerNotExistsError } from '../../../src/core/shared/Errors'
import DeleteFarmer from '../../../src/core/useCases/DeleteFarmer'
import DocumentValidator from '../../../src/core/validators/DocumentValidator'

describe('DeleteFarmer Use Case', () => {
  let deleteFarmer: DeleteFarmer
  let mockFarmerRepository: jest.Mocked<FarmerRepository>
  let mockDocumentValidator: jest.Mocked<DocumentValidator>

  beforeEach(() => {
    mockFarmerRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      getByDocument: jest.fn(),
      putById: jest.fn(),
      putByDocument: jest.fn(),
      deleteById: jest.fn(),
      deleteByDocument: jest.fn(),
    }

    mockDocumentValidator = {
      validate: jest.fn(),
    }

    deleteFarmer = new DeleteFarmer(mockFarmerRepository)
  })

  it('should throw an error if the farmer does not exist', async () => {
    mockFarmerRepository.getByDocument.mockResolvedValue(null)

    const document = '12345678901'

    await expect(deleteFarmer.execute(document)).rejects.toThrow(
      FarmerNotExistsError
    )
  })

  it('should delete the farmer if the farmer exists', async () => {
    const crops = [new Crop('corn'), new Crop('soybeans')]
    const farm = new Farm('My farm', 'Cerro Largo', 'RS', 100, 40, 30, crops)

    const document = '12345678901'
    const existingFarmer = new Farmer(
      'Zeus',
      document,
      farm,
      mockDocumentValidator
    )

    mockFarmerRepository.getByDocument.mockResolvedValue(existingFarmer)

    await deleteFarmer.execute(document)

    expect(mockFarmerRepository.deleteByDocument).toHaveBeenCalledWith(document)
  })
})
