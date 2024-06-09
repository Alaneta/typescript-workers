import fs from 'fs'
import path from 'path'
import {Worker} from 'worker_threads'
import {BAD_REQUEST} from 'http-status'
import {CustomError} from '../tools/customError'

export class WorkerResolver {
  runWorker(file: string, workerType: string, directory: string): Worker {
    const workerPath: string = `./dist/src/workers/${workerType}Worker.js`

    if (!fs.existsSync(workerPath)) {
      throw new CustomError(`Worker file not found for job type: ${workerType}`, BAD_REQUEST)
    }

    return new Worker(workerPath, {
      workerData: path.join(directory, file),
    })
  }
}
