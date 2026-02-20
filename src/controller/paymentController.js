import client from "../services/mercadoPagoServices.js";
import { Preference } from "mercadopago";

const fallo = "http://localhost:5173/failedpurchase"
const exito = "http://localhost:5173/successfullpurchase"
export const createCheckout = async (req, res) => {
    try {
        const { items, orderId, payerEmail } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No se enviaron items" });
        }

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items: items.map(item => ({
                    title: item.title,
                    quantity: Number(item.quantity),
                    unit_price: Number(item.unitPrice),
                    picture_url: item.picture_url,
                    currency_id: "ARS"
                })),
                payer: {
                    email: payerEmail
                },
                external_reference: String(orderId),
          back_urls: {
    success: exito,
    pending: "https://estoyesperando.com",
    failure: fallo
},
            binary_mode: true
            }
            
        });
            console.log("datovich",req.body)
            console.log("RESULT MP:", result);
        return res.json({
            checkoutUrl: result.init_point,
            preferenceId: result.id
        });

    } catch (error) {
        console.error("ERROR MP:", error);
        return res.status(500).json({ error: "error creando el preference" });
    }
};


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

