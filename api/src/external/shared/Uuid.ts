import Id from '../../core/shared/Id'
import { randomUUID } from 'crypto'

class Uuid implements Id {
  generate(): string {
    const uuid = randomUUID().toString()

    return uuid
  }
}

export default Uuid
