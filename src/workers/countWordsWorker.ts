import fs from 'fs'
import {CountWordsWorkerDTO} from '../dtos/WorkerDTO'
import {parentPort, workerData} from 'worker_threads'

fs.readFile(workerData, 'utf8', (_err: NodeJS.ErrnoException | null, data: string): void => {
    const resultData: CountWordsWorkerDTO = {wordsCount: Number(data.split(/\s+/).length)}
    parentPort?.postMessage({resultData})
})
