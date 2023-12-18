import express from "express";
import 'dotenv/config'
import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerRoles } from "./routes/roleRoutes";
import { router as routerTimeFrame } from "./routes/timeFrameRoutes";
import { router as routerTechnicalResource } from "./routes/technicalResourcesRoutes";
import { router as routerBuySignal } from "./routes/buySignalRoutes";
import { router as routerBuyTechnical } from "./routes/buyTechnicalRoutes";
import { router as routerStrategy } from "./routes/strategyRoutes";
import { router as routerSellSignal } from "./routes/sellSignalRoutes";
import { router as routerSellTechnical } from "./routes/sellTechnicalRoutes";
import { router as routerTrade } from "./routes/tradeRoutes";
import { AppDataSource } from "./db";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use('/user', routerUsers)
app.use('/role', routerRoles)
app.use('/timeframe', routerTimeFrame)
app.use('/technicalresource', routerTechnicalResource)
app.use('/buysignal', routerBuySignal)
app.use('/buytechnical', routerBuyTechnical)
app.use('/sellsignal', routerSellSignal)
app.use('/selltechnical', routerSellTechnical)
app.use('/strategy', routerStrategy)
app.use('/trade', routerTrade)

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })
