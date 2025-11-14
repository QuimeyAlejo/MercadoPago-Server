import client from "../services/mercadoPagoServices.js";
import { Preference } from "mercadopago";

export const createCheckout = async (req,res) => {
    try {
        const {items} = req.body;

        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: items.map(item => ({
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.price),
                    currency_id : "ARS"
                })),
                back_urls: {
                    success: "saliojoya.com",
                    pending: "estoyesperando.com",
                    failure: "falle.com"
                },
                auto_return: 'approved',
                notification_url: "webhook",
                binary_mode: true
            }
        });
        return res.json({
            checkout_url: result.init_point
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "error creando el preference"})
    }
}


export const testCheckout = async (req, res) => {
    try {
        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: [
                    {
                        title: "Zapatillas deportivas",
                        quantity: 1,
                        unit_price: 25000,
                        description: "zapas"
                      },
                      {
                        title: "Remera estampada",
                        quantity: 2,
                        unit_price: 8000,
                         description: "remera"
                      },
                      {
                        title: "Gorra negra",
                        quantity: 1,
                        unit_price: 6000,
                         description: "gorra"
                      }
                ],
                back_urls: {
                    success: "https://www.google.com",
                    failure: "https://www.youtube.com",
                    pending: "https://www.google.com"
                },
                auto_return: "approved",
                notification_url: "https://webhook.site/tu-url-de-prueba", // Para testear
                binary_mode: true
            }
        });
        
        console.log(JSON.stringify(result, null, 2))
        return res.json({
            checkout_url: result.init_point,
        });

    } catch (error) {
        console.error("Error creando preferencia:", error);
        return res.status(500).json({ error: "No se pudo crear la preferencia" });
    }
};

