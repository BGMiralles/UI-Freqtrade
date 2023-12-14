import express from "express";
import 'dotenv/config'
import { router as routerUsers } from "./routes/usersRoutes";
import { AppDataSource } from "./db";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use('/user', routerUsers)

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
