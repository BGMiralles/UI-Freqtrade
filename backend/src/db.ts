import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config'

import { RoleFkAtUsers1702290088419 } from "./migration/1702290088419-role_fk_at_users"
import { CreateTechnicalResources1702291424267 } from "./migration/1702291424267-create_technical_resources"
import { CreateUsersTable1702296323232 } from "./migration/1702296323232-create_users_table"
import { CreateSellSignalsTable1702298927057 } from "./migration/1702298927057-create_sell_signals_table"
import { CreateBuySignalsTable1702299149304 } from "./migration/1702299149304-create_buy_signals_table"
import { CreateSellTechnicalsTable1702300979806 } from "./migration/1702300979806-create_sell_technicals_table"
import { CreateBuyTechnicalsTable1702301355631 } from "./migration/1702301355631-create_buy_technicals_table"
import { Role } from "./models/Role"
import { User } from "./models/User"
import { TechnicalResource } from "./models/TechnicalResource"
import { BuySignal } from "./models/BuySignal"
import { SellSignal } from "./models/SellSignal"
import { SellTechnical } from "./models/SellTechnical"
import { BuyTechnical } from "./models/BuyTechnical"
import { Strategy } from "./models/Strategy"
import { CreateTimeFramesTable1702487861717 } from "./migration/1702487861717-create_time_frames_table"
import { TimeFrame } from "./models/TimeFrame"
import { CreatePairsTable1702487679654 } from "./migration/1702487679654-create_pairs_table"
import { Pair } from "./models/Pair"
import { CreateTransactionsTable1702488021515 } from "./migration/1702488021515-create_transactions_table"
import { Trade } from "./models/Trade"
import { CreateStrategiesTable1702489125518 } from "./migration/1702489125518-create_strategies_table"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Role, TechnicalResource, BuySignal, SellSignal, SellTechnical, BuyTechnical, Strategy, TimeFrame, Pair, Trade],
  migrations: [
    RoleFkAtUsers1702290088419,
    CreateUsersTable1702296323232,
    CreateTechnicalResources1702291424267,
    CreateBuySignalsTable1702299149304,
    CreateSellSignalsTable1702298927057,
    CreateSellTechnicalsTable1702300979806,
    CreateBuyTechnicalsTable1702301355631,
    CreateStrategiesTable1702489125518,
    CreateTimeFramesTable1702487861717,
    CreatePairsTable1702487679654,
    CreateTransactionsTable1702488021515
  ],
  synchronize: false,
  logging: false,
})
