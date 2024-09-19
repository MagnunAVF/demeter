/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client'
import Farmer from '../../core/models/Farmer'
import FarmerRepository from '../../core/repository/FarmerRepository'
import Crop from '../../core/models/Crop'
import Farm from '../../core/models/Farm'
import DocumentValidator from '../../core/validators/DocumentValidator'

type CropData = {
  id: string
}

class PgFarmerRepository implements FarmerRepository {
  constructor(private documentValidator: DocumentValidator) {}

  prisma = new PrismaClient()

  // Create a crop if necessary (many-to-many relation with farm and unique names)
  private async handleCrops(crops: Crop[]): Promise<CropData[]> {
    const cropsPromises = crops.map(async (crop) => {
      const foundCrop = await this.prisma.crop.findUnique({
        where: { name: crop.name },
      })

      if (foundCrop) {
        return { id: foundCrop.id }
      } else {
        const createdCrop = await this.prisma.crop.create({
          data: { name: crop.name },
        })
        return { id: createdCrop.id }
      }
    })

    const cropsData = await Promise.all(cropsPromises)

    return cropsData
  }

  async create(farmer: Farmer): Promise<void> {
    const cropsData = await this.handleCrops(farmer.farm.crops)

    await this.prisma.farmer.create({
      data: {
        name: farmer.name,
        document: farmer.document,
        farm: {
          create: {
            name: farmer.farm.name,
            city: farmer.farm.city,
            state: farmer.farm.state,
            totalArea: farmer.farm.totalArea,
            arableArea: farmer.farm.arableArea,
            vegetationArea: farmer.farm.vegetationArea,
            crops: {
              create: cropsData.map((crop) => ({
                crop: { connect: { id: crop.id } },
              })),
            },
          },
        },
      },
      include: {
        farm: {
          include: {
            crops: {
              include: { crop: true },
            },
          },
        },
      },
    })
  }

  // DB to model wrapper
  private handleFarmerData(farmerData: any): Farmer {
    if (!farmerData) throw Error('Invalid data, empty info!')

    const farm = farmerData.farm
      ? new Farm(
          farmerData.farm.name,
          farmerData.farm.city,
          farmerData.farm.state,
          farmerData.farm.totalArea,
          farmerData.farm.arableArea,
          farmerData.farm.vegetationArea,
          farmerData.farm.crops.map(
            (farmCrop: any) => new Crop(farmCrop.crop.name, farmCrop.crop.id)
          ),
          farmerData.farm.id
        )
      : null

    if (!farm) throw Error('Invalid data, farmer without a farm!')

    return new Farmer(
      farmerData.name,
      farmerData.document,
      farm,
      this.documentValidator,
      farmerData.id
    )
  }

  async getById(id: string): Promise<Farmer | null> {
    const farmerData = await this.prisma.farmer.findUnique({
      where: { id },
      include: {
        farm: {
          include: {
            crops: {
              include: {
                crop: true,
              },
            },
          },
        },
      },
    })

    if (!farmerData) return null

    const farmer: Farmer = this.handleFarmerData(farmerData)

    return farmer
  }

  async getByDocument(document: string): Promise<Farmer | null> {
    const farmerData = await this.prisma.farmer.findUnique({
      where: { document },
      include: {
        farm: {
          include: {
            crops: {
              include: {
                crop: true,
              },
            },
          },
        },
      },
    })

    if (!farmerData) return null

    const farmer: Farmer = this.handleFarmerData(farmerData)

    return farmer
  }

  private prepareDataToUpdate(farmer: Farmer): any {
    return {
      name: farmer.name,
      document: farmer.document,
      farm: {
        upsert: {
          create: {
            name: farmer.farm?.name,
            city: farmer.farm?.city,
            state: farmer.farm?.state,
            totalArea: farmer.farm?.totalArea,
            arableArea: farmer.farm?.arableArea,
            vegetationArea: farmer.farm?.vegetationArea,
            crops: {
              create:
                farmer.farm?.crops.map((crop) => ({
                  crop: {
                    connectOrCreate: {
                      where: { name: crop.name },
                      create: { name: crop.name },
                    },
                  },
                })) || [],
            },
          },
          update: {
            name: farmer.farm?.name,
            city: farmer.farm?.city,
            state: farmer.farm?.state,
            totalArea: farmer.farm?.totalArea,
            arableArea: farmer.farm?.arableArea,
            vegetationArea: farmer.farm?.vegetationArea,
            crops: {
              deleteMany: {},
              create:
                farmer.farm?.crops.map((crop) => ({
                  crop: {
                    connectOrCreate: {
                      where: { name: crop.name },
                      create: { name: crop.name },
                    },
                  },
                })) || [],
            },
          },
        },
      },
    }
  }

  async putById(id: string, farmer: Farmer): Promise<void> {
    await this.prisma.farmer.update({
      where: { id },
      data: this.prepareDataToUpdate(farmer),
    })
  }

  async putByDocument(document: string, farmer: Farmer): Promise<void> {
    await this.prisma.farmer.update({
      where: { document },
      data: this.prepareDataToUpdate(farmer),
    })
  }

  async deleteById(id: string): Promise<void> {
    const farmer = await this.prisma.farmer.findUnique({
      where: { id },
    })

    if (!farmer) {
      throw new Error('Farmer not found')
    }

    await this.prisma.farmer.delete({
      where: { id },
    })
  }

  async deleteByDocument(document: string): Promise<void> {
    const farmer = await this.prisma.farmer.findUnique({
      where: { document },
    })

    if (!farmer) {
      throw new Error('Farmer not found')
    }

    await this.prisma.farmer.delete({
      where: { document },
    })
  }
}

export default PgFarmerRepository
