import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"
import { RoleFkAtUsers1702290088419 } from "./migration/1702290088419-role_fk_at_users"
import { Role } from "./models/Role"
import { CreateTechnicalResources1702291424267 } from "./migration/1702291424267-create_technical_resources"
import { TechnicalResources } from "./models/TechnicalResources"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role, TechnicalResources],
  migrations: [
    CreateUsersTable1698050881658,
    RoleFkAtUsers1702290088419,
    CreateTechnicalResources1702291424267
  ],
  synchronize: false,
  logging: false,
})
