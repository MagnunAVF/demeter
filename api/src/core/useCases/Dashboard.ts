import DashboardRepository from '../repository/DashboardRepository'
import UseCase from './UseCase'

export type DashboardArea = {
  totalFarms: number
  totalArea: number
}

class Dashboard implements UseCase<void, DashboardArea> {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(): Promise<DashboardArea> {
    const totalFarms = await this.dashboardRepository.getFarmsTotalNumber()
    const totalArea = await this.dashboardRepository.getFarmsTotalArea()

    return {
      totalArea,
      totalFarms,
    }
  }
}

export default Dashboard
