import fs from 'fs'
import path from 'path'
import { Worker } from 'worker_threads'
import { BAD_REQUEST } from 'http-status'
import {WorkerDTO} from '../dtos/WorkerDTO'
import { CustomError } from '../tools/customError'

export class WorkerResolver {
  runWorker(file: string, workerType: string, directory: string): Promise<WorkerDTO> {
    const workerPath: string = `./dist/src/workers/${workerType}Worker.js`

    if (!fs.existsSync(workerPath)) {
      throw new CustomError(`Worker file not found for job type: ${workerType}`, BAD_REQUEST)
    }

    const worker: Worker = new Worker(workerPath, {
      workerData: path.join(directory, file),
    })

    return new Promise((resolve, reject): void => {
      worker.on('message', resolve)
      worker.on('error', reject)
    })
  }
}
