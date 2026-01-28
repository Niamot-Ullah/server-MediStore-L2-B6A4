import express from 'express'
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { medicineRouter } from './modules/medicine/medicine.router';
import { categoriesRouter } from './modules/categories/categories.router';
import { auth } from './lib/auth';

const app = express();

//  JSON FIRST
app.use(express.json());

//  CORS SECOND
app.use(
    cors({
        origin: [
            process.env.FRONTEND_APP_URL!,
            "http://localhost:3000",
            "http://localhost:4000",
            "http://localhost:5000",
        ],
        credentials: true,
    })
);

//  AUTH AFTER json + cors
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api/medicine", medicineRouter)
app.use("/api/categories", categoriesRouter)





app.get('/', (req, res) => {
    res.send('Welcome to MediStore');
})

export default app;