import pinoHttp from 'pino-http'
import logger from '../../logger'

// Build the Pino Logger middleware
export default pinoHttp(logger)
