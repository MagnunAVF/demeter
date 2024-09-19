export class InvalidTotalAreaError extends Error {
  constructor(
    message: string = 'The sum of arable and vegetation area cannot exceed total area'
  ) {
    super(message)
    this.name = this.constructor.name

    Object.setPrototypeOf(this, InvalidTotalAreaError.prototype)
  }
}

export class FarmerExistsError extends Error {
  constructor(message: string = 'Farmer already exists!') {
    super(message)
    this.name = this.constructor.name

    Object.setPrototypeOf(this, FarmerExistsError.prototype)
  }
}

export class FarmerNotExistsError extends Error {
  constructor(message: string = 'Farmer not exists!') {
    super(message)
    this.name = this.constructor.name

    Object.setPrototypeOf(this, FarmerNotExistsError.prototype)
  }
}

export class InvalidDocumentError extends Error {
  constructor(message: string = 'Invalid Document!') {
    super(message)
    this.name = this.constructor.name

    Object.setPrototypeOf(this, InvalidDocumentError.prototype)
  }
}

export class InvalidDbDataError extends Error {
  constructor(message: string = 'Invalid data, farmer without a farm!') {
    super(message)
    this.name = this.constructor.name

    Object.setPrototypeOf(this, InvalidDbDataError.prototype)
  }
}
