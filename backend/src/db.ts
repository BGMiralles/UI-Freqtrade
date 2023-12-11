import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

import { CreateUsersTable1698050881658 } from "./migration/1698050881658-create-users-table"
import { User } from "./models/User"
import { RoleFkAtUsers1702290088419 } from "./migration/1702290088419-role_fk_at_users"
import { Role } from "./models/Role"
import { CreateTechnicalResources1702291424267 } from "./migration/1702291424267-create_technical_resources"
import { TechnicalResource } from "./models/TechnicalResource"
import { CreateBuySignals1702293089937 } from "./migration/1702293089937-create_buy_signals"
import { CreateSellSignals1702291882434 } from "./migration/1702291882434-create_sell_signals"
import { BuySignal } from "./models/BuySignal"
import { SellSignal } from "./models/SellSignal"
import { CreateSellTechnicals1702293428642 } from "./migration/1702293428642-create_sell_technicals"
import { SellTechnical } from "./models/SellTechnical"
import { CreateBuyTechnicals1702293670740 } from "./migration/1702293670740-create_buy_technicals"
import { BuyTechnical } from "./models/BuyTechnical"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role, TechnicalResource, BuySignal, SellSignal, SellTechnical, BuyTechnical],
  migrations: [
    CreateUsersTable1698050881658,
    RoleFkAtUsers1702290088419,
    CreateTechnicalResources1702291424267,
    CreateBuySignals1702293089937,
    CreateSellSignals1702291882434,
    CreateSellTechnicals1702293428642,
    CreateBuyTechnicals1702293670740
  ],
  synchronize: false,
  logging: false,
})
