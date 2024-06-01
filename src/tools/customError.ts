export class CustomError extends Error {
  readonly status: number

  readonly additionalInfo: NonNullable<unknown>

  constructor(message: string, status: number = 500, additionalInfo: NonNullable<unknown> = {}) {
    super(message)
    this.name = 'CustomError'
    this.status = status
    this.additionalInfo = additionalInfo
  }
}
