import fs from 'fs'
import { promisify } from 'util'
import { WorkerResolver } from '../workers/WorkerResolver'
import { FileProcessResponseDTO } from '../dtos/FileProcessResponseDTO'

const readdir = promisify(fs.readdir)

export class FileService {
  readonly DIRECTORY_PATH: string = './logs'

  private workerResolver: WorkerResolver

  constructor(workerResolver: WorkerResolver) {
    this.workerResolver = workerResolver
  }

  async process(workerType: string): Promise<FileProcessResponseDTO> {
    const results: FileProcessResponseDTO = {}
    const files: string[] = await readdir(this.DIRECTORY_PATH)

    await Promise.all(
      files.map(async (file: string): Promise<void> => {
        results[file] = await this.workerResolver.runWorker(file, workerType, this.DIRECTORY_PATH)
      }),
    )

    return results
  }
}
