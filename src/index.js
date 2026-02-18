 import express from "express";
 import dotenv from "dotenv";
 import paymentRoutes from './routes/payment.routes.js'

 dotenv.config();
 
 const PORT = 3000;

 const app = express();
 app.use(express.json());

 app.use('/api',paymentRoutes)

 app.listen(PORT, () => console.log(`MP Service listening on port http://localhost:${PORT}`));




