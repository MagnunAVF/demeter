interface UpdateFarmerDto {
  name: string
  document: string
  farm: {
    name: string
    city: string
    state: string
    totalArea: number
    arableArea: number
    vegetationArea: number
    crops: string[]
  }
}

export default UpdateFarmerDto
