import { WorkerResolver } from '../workers/WorkerResolver'
import { FileService as FileServiceClass } from './FileService'

const FileService: FileServiceClass = new FileServiceClass(new WorkerResolver())

export { FileService }
