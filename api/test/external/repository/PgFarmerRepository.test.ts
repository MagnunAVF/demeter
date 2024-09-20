/* eslint-disable @typescript-eslint/no-explicit-any */
import Crop from '../../../src/core/models/Crop'
import Farm from '../../../src/core/models/Farm'
import Farmer from '../../../src/core/models/Farmer'
import DocumentValidator from '../../../src/core/validators/DocumentValidator'
import PgFarmerRepository from '../../../src/external/repository/PgFarmerRepository'
import CpfAndCnpjValidator from '../../../src/external/validators/CpfAndCnpjValidator'

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    crop: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    farmer: {
      create: jest.fn(),
    },
  }
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  }
})

describe('PgFarmerRepository', () => {
  let repository: PgFarmerRepository
  let mockPrisma: any
  let documentValidator: DocumentValidator

  beforeEach(() => {
    documentValidator = new CpfAndCnpjValidator()
    repository = new PgFarmerRepository(documentValidator)
    mockPrisma = (repository as any).prisma
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a farmer with crops if crops do not exist', async () => {
    const crops: Crop[] = [new Crop('Corn'), new Crop('Wheat')]
    const farm: Farm = new Farm(
      'My Farm',
      'Cerro Largo',
      'RS',
      100,
      80,
      20,
      crops
    )
    const farmer: Farmer = new Farmer(
      'Zeus',
      '259.456.540-78',
      farm,
      documentValidator
    )

    mockPrisma.crop.findUnique.mockResolvedValueOnce(null)
    mockPrisma.crop.create.mockResolvedValueOnce({ id: 'crop1' })
    mockPrisma.crop.findUnique.mockResolvedValueOnce(null)
    mockPrisma.crop.create.mockResolvedValueOnce({ id: 'crop2' })

    await repository.create(farmer)

    expect(mockPrisma.crop.findUnique).toHaveBeenCalledTimes(2)
    expect(mockPrisma.crop.create).toHaveBeenCalledTimes(2)
    expect(mockPrisma.farmer.create).toHaveBeenCalledWith({
      data: {
        document: '259.456.540-78',
        farm: {
          create: {
            arableArea: 80,
            city: 'Cerro Largo',
            crops: {
              create: [
                { crop: { connect: { id: 'crop1' } } },
                { crop: { connect: { id: 'crop2' } } },
              ],
            },
            name: 'My Farm',
            state: 'RS',
            totalArea: 100,
            vegetationArea: 20,
          },
        },
        name: 'Zeus',
      },
      include: { farm: { include: { crops: { include: { crop: true } } } } },
    })
  })
})
