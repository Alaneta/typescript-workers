import { CustomError } from '../../tools/customError'
import { Request, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from 'http-status'

export default function errorHandler(err: Error | CustomError, req: Request, res: Response) {
  let customError: Error | CustomError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'An internal server error occurred. The request could not be processed.',
      INTERNAL_SERVER_ERROR,
    )
  }
  res.status((customError as CustomError).status).send(customError)
}
