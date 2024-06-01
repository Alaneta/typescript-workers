import Logger from '../logger'
import { OK } from 'http-status'
import { FileService } from '../services'
import { NextFunction, Request, Response, Router } from 'express'
import { FileProcessResponseDTO } from '../dtos/FileProcessResponseDTO'

export async function processAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const action: string = String(req.query.action)
    const response: FileProcessResponseDTO = await FileService.process(action)
    res.status(OK).json(response)
  } catch (err) {
    Logger.error(err)
    next(err)
  }
}

const router: Router = Router()

router.get('/files', processAll)

export const FilesRouter: Router = router
