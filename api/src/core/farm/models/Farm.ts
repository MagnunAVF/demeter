import Crop from '../../crop/models/Crop'

class Farm {
  name: string
  city: string
  state: string
  totalArea: number
  arableArea: number
  vegetationArea: number
  crops: Crop[]

  constructor(
    name: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
    crops: Crop[]
  ) {
    this.validateTotalArea(totalArea, arableArea, vegetationArea)

    this.name = name
    this.city = city
    this.state = state
    this.totalArea = totalArea
    this.arableArea = arableArea
    this.vegetationArea = vegetationArea
    this.crops = crops
  }

  validateTotalArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ): void {
    if (arableArea + vegetationArea > totalArea) {
      throw Error(
        'The sum of arable and vegetation area cannot exceed total area'
      )
    }
  }
}

export default Farm
