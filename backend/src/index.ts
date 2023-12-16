import express from "express";
import 'dotenv/config'
import { router as routerUsers } from "./routes/usersRoutes";
import { router as routerRoles } from "./routes/roleRoutes";
import { router as routerTimeFrame } from "./routes/timeFrameRoutes";
import { router as routerTechnicalResource } from "./routes/technicalResourcesRoutes";
import { AppDataSource } from "./db";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use('/user', routerUsers)
app.use('/role', routerRoles)
app.use('/timeframe', routerTimeFrame)
app.use('/technicalresource', routerTechnicalResource)

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
