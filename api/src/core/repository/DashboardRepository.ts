interface DashboardRepository {
  getFarmsTotalNumber(): Promise<number>
  getFarmsTotalArea(): Promise<number>
}

export default DashboardRepository
