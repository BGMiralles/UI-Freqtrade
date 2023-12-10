import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"
import { CreateTasksTable1698146272912 } from "./migration/1698146272912-create-tasks-table"
import { Task } from "./models/Task"
import { CreateTableTaskUser1698228572293 } from "./migration/1698228572293-create-table-task-user"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task],
  migrations: [
    CreateUsersTable1698050881658,
    CreateTasksTable1698146272912,
    CreateTableTaskUser1698228572293
  ],
  synchronize: false,
  logging: false,
})

// export { AppDataSource }
