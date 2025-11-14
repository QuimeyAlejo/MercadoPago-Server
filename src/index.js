 import express from "express";
 import dotenv from "dotenv";
 import paymentRoutes from './routes/payment.routes.js'

 dotenv.config();
 
 const PORT = 3000;

 const app = express();
 app.use(express.json());

 app.use('/api',paymentRoutes)

 app.listen(PORT, () => console.log(`MP Service listening on port http://localhost:${PORT}`));




/*
import express from "express";
import dotenv from "dotenv";
import { MercadoPagoConfig, Preference } from "mercadopago";

dotenv.config();

const app = express();
app.use(express.json());


const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

app.get("/test-checkout", async (req, res) => {
    try {
        const preference = new Preference(mpClient);

        const result = await preference.create({
            body: {
                items: [
                    {
                        title: "Producto de prueba",
                        quantity: 1,
                        unit_price: 1500
                    }
                ],
                back_urls: {
                    success: "https://www.google.com",
                    failure: "https://www.google.com",
                    pending: "https://www.google.com"
                },
                auto_return: "approved",
                notification_url: "https://webhook.site/tu-url",
                binary_mode: true
            }
        });

        res.json({
            checkout_url: result.init_point
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error creando preferencia" });
    }
});

app.listen(3000, () => console.log("Server ON → http://localhost:3000"));

*/