import Crop from '../../../../src/core/crop/models/Crop'

describe('Crop Class', () => {
  it('should create a crop instance with correct name', () => {
    const name = 'corn'
    const crop = new Crop(name)

    expect(crop.name).toBe(name)
  })
})
