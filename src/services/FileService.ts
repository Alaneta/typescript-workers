import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { WorkerResolver } from '../workers/WorkerResolver'
import { FileProcessResponseDTO } from '../dtos/FileProcessResponseDTO'

const readdir = promisify(fs.readdir)
const readfile = promisify(fs.readFile)

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

  async processWithoutWorkers(): Promise<FileProcessResponseDTO> {
    const results: FileProcessResponseDTO = {};

    const files = await readdir(this.DIRECTORY_PATH);

    for (const file of files) {
      const filePath = path.join(this.DIRECTORY_PATH, file)
      // eslint-disable-next-line no-await-in-loop
      const fileContent: string = await readfile(filePath, 'utf-8')
      const wordCount: number = this.countWords(fileContent)

      results[file] = { resultData: {wordsCount: wordCount } }
    }

    return results
  }

  private countWords(text: string): number {
    const words = text.split(/\s+/).filter(word => word.trim() !== '');
    return words.length;
  }
}
