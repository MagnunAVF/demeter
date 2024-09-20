import Crop from './Crop'
import { InvalidTotalAreaError } from '../shared/Errors'
class Farm {
  id?: string
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
    crops: Crop[],
    id?: string
  ) {
    this.validateTotalArea(totalArea, arableArea, vegetationArea)

    this.name = name
    this.city = city
    this.state = state
    this.totalArea = totalArea
    this.arableArea = arableArea
    this.vegetationArea = vegetationArea
    this.crops = crops
    this.id = id
  }

  validateTotalArea(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ): void {
    if (arableArea + vegetationArea > totalArea) {
      throw new InvalidTotalAreaError()
    }
  }
}

export default Farm
