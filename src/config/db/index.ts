import {Pool} from "pg"
import {drizzle} from "drizzle-orm/node-postgres"
import { DATABASE_URL } from "../env"


const pool=new Pool({
  connectionString: DATABASE_URL,
  ssl:true
})

export const db=drizzle(pool)
