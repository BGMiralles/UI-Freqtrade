import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [
    CreateUsersTable1698050881658
  ],
  synchronize: false,
  logging: false,
})
