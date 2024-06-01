import { cleanEnv, num, str } from 'envalid'

import dotenv from 'dotenv'
import { assert } from 'console'

assert(process.env.NODE_ENV, 'NODE_ENV must be specified')

dotenv.config({ path: `./.setup/${process.env.NODE_ENV}/.env` })

export default cleanEnv(process.env, {
  NODE_ENV: str({ default: 'production' }),

  SERVER_PORT: num({ default: 3000 }),

  DB_URI: str({ default: 'sqlite::memory:' }),
  DB_POOL_MAX_CONNECTIONS: num({ default: 50 }),
  DB_POOL_MIN_CONNECTIONS: num({ default: 5 }),
  DB_POOL_IDLE_CONNECTIONS: num({ default: 10000 }),
})
