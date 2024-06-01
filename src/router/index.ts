import { Router } from 'express'
import {FilesRouter} from './files'
import { HealthcheckRouter } from './healthcheck'

export const Routes = Router()

Routes.use(FilesRouter)
Routes.use(HealthcheckRouter)
