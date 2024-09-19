import { randomUUID } from 'crypto'
import Uuid from '../../../src/external/shared/Uuid'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'mocked-uuid'),
}))

describe('Id class', () => {
  let id: Uuid

  beforeEach(() => {
    id = new Uuid()
  })

  it('should return a string when generate() is called', () => {
    const uuid = id.generate()
    expect(typeof uuid).toBe('string')
  })

  it('should call randomUUID to generate a UUID', () => {
    id.generate()

    expect(randomUUID).toHaveBeenCalled()
  })
})
