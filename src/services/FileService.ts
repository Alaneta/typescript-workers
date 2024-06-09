import fs from 'fs'
import {Worker} from 'worker_threads'
import {CustomError} from "../tools/customError"
import { WorkerResolver } from '../workers/WorkerResolver'
import { FileProcessResponseDTO } from '../dtos/FileProcessResponseDTO'

export class FileService {
  readonly DIRECTORY_PATH: string = './logs'

  private workerResolver: WorkerResolver

  constructor(workerResolver: WorkerResolver) {
    this.workerResolver = workerResolver
  }

  process(workerType: string): FileProcessResponseDTO {
    const results: FileProcessResponseDTO = {}

    fs.readdir(this.DIRECTORY_PATH, (_err: NodeJS.ErrnoException | null, files: string[]): void => {
      files.forEach((file: string): void => {
        const worker: Worker = this.workerResolver.runWorker(file, workerType, this.DIRECTORY_PATH)

        worker.on('message', (result) => {
          results[file] = result.resultData
        })

        worker.on('error', (error: Error) => {
          throw new CustomError(error.message)
        })
      })
    })

    return results
  }
}
