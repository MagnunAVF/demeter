import { PrismaClient } from '@prisma/client'
import DashboardRepository from '../../core/repository/DashboardRepository'

class PgDashboardRepository implements DashboardRepository {
  prisma = new PrismaClient()

  async getFarmsTotalNumber(): Promise<number> {
    const totalFarms = await this.prisma.farm.count()

    return totalFarms
  }

  async getFarmsTotalArea(): Promise<number> {
    const sumTotalArea = await this.prisma.farm.aggregate({
      _sum: {
        totalArea: true,
      },
    })

    return sumTotalArea
  }
}

export default PgDashboardRepository
