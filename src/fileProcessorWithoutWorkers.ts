import { FileService } from './services'
import { FileProcessResponseDTO } from './dtos/FileProcessResponseDTO'

async function processFiles(): Promise<void> {
  try {
    const results: FileProcessResponseDTO = await FileService.processWithoutWorkers()
    console.log(results)
  } catch (error) {
    console.error(error)
  }
}

processFiles()
