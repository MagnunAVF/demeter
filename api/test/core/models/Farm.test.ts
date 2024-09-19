import Crop from '../../../src/core/models/Crop'
import Farm from '../../../src/core/models/Farm'
import { InvalidTotalAreaError } from '../../../src/core/shared/Errors'

describe('Farm Class', () => {
  let name: string, city: string, state: string

  beforeAll(() => {
    name = 'My farm'
    city = 'Cerro Largo'
    state = 'RS'
  })

  it('should create a Farm instance with valid arguments', () => {
    const crops = [new Crop('corn'), new Crop('soybeans')]
    const farm = new Farm(name, city, state, 100, 40, 30, crops)

    expect(farm).toBeInstanceOf(Farm)
    expect(farm.name).toBe(name)
    expect(farm.city).toBe(city)
    expect(farm.state).toBe(state)
    expect(farm.totalArea).toBe(100)
    expect(farm.arableArea).toBe(40)
    expect(farm.vegetationArea).toBe(30)
    expect(farm.crops).toEqual(crops)
  })

  it('should throw an error if arable and vegetation areas exceed total area', () => {
    expect(() => {
      new Farm(name, city, state, 100, 60, 50, [])
    }).toThrow(InvalidTotalAreaError)
  })

  it('should not throw an error if arable and vegetation areas are equal to total area', () => {
    expect(() => {
      new Farm(name, city, state, 100, 50, 50, [])
    }).not.toThrow()
  })
})
