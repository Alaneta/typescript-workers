import { ServerApp } from './server'
import Logger from './logger'
import Config from './config'

;(async () => {
  try {
    /**
     * Bootstrap the application here and handle any errors events gracefully.
     */
    const app = ServerApp.getInstance()

    const srv = app.listen(Config.SERVER_PORT)

    Logger.info(`Environment: ${Config.NODE_ENV}`)
    Logger.info(`Server is listening on port ${Config.SERVER_PORT}`)

    srv.on('error', (error) => {
      Logger.error(error.message)
    })
  } catch (err) {
    Logger.error(err)
    process.exit(1)
  }
})()
