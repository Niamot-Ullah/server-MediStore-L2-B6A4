import express from 'express'
import cors from 'cors'
import { medicineRouter } from './modules/medicine/medicine.router';

const app = express();
app.use(cors())
app.use(express.json())

app.use("/api/medicine",medicineRouter)





app.get('/',(req,res)=>{
 res.send('Welcome to MediStore');
})

export default app;