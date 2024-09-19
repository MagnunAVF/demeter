import Crop from '../../../src/core/models/Crop'
import Farm from '../../../src/core/models/Farm'
import Farmer from '../../../src/core/models/Farmer'
import FarmerRepository from '../../../src/core/repository/FarmerRepository'
import EditFarmer from '../../../src/core/useCases/EditFarmer'
import DocumentValidator from '../../../src/core/validators/DocumentValidator'

describe('EditFarmer Use Case', () => {
  let editFarmer: EditFarmer
  let mockFarmerRepository: jest.Mocked<FarmerRepository>
  let mockDocumentValidator: jest.Mocked<DocumentValidator>
  let farm: Farm
  let crops: Crop[]

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

    crops = [new Crop('corn'), new Crop('soybeans')]
    farm = new Farm('My farm', 'Cerro Largo', 'RS', 100, 40, 30, crops)

    editFarmer = new EditFarmer(mockFarmerRepository, mockDocumentValidator)
  })

  it('should throw an error if the farmer does not exist', async () => {
    mockFarmerRepository.getByDocument.mockResolvedValue(null)

    const farmer = new Farmer(
      'Zeus',
      '12345678901',
      farm,
      mockDocumentValidator,
      'id'
    )

    await expect(editFarmer.execute(farmer)).rejects.toThrow(
      'Farmer not exists!'
    )
  })

  it('should update the farmer if the farmer exists', async () => {
    const existingFarmer = new Farmer(
      'Zeus',
      '12345678901',
      farm,
      mockDocumentValidator,
      'existing-id'
    )

    mockFarmerRepository.getByDocument.mockResolvedValue(existingFarmer)

    const updatedFarmer = new Farmer(
      'Zeus Updated',
      '12345678901',
      farm,
      mockDocumentValidator,
      'existing-id'
    )

    await editFarmer.execute(updatedFarmer)

    expect(mockFarmerRepository.putByDocument).toHaveBeenCalledWith(
      '12345678901',
      expect.objectContaining({
        name: 'Zeus Updated',
        document: '12345678901',
        farm,
        id: 'existing-id',
      })
    )
  })

  it('should validate the farmer document before updating', async () => {
    const existingFarmer = new Farmer(
      'Zeus',
      '12345678901',
      farm,
      mockDocumentValidator,
      'existing-id'
    )

    mockFarmerRepository.getByDocument.mockResolvedValue(existingFarmer)

    const updatedFarmer = new Farmer(
      'Zeus Updated',
      '12345678901',
      farm,
      mockDocumentValidator,
      'existing-id'
    )

    await editFarmer.execute(updatedFarmer)

    expect(mockDocumentValidator.validate).toHaveBeenCalledWith('12345678901')
  })
})
