import { FileService } from './services'
import { FileProcessResponseDTO } from './dtos/FileProcessResponseDTO'

async function processFiles() {
  try {
    const results: FileProcessResponseDTO = FileService.process('countWords')
    console.log(results)
  } catch (error) {
    console.error(error)
  }
}

processFiles()
