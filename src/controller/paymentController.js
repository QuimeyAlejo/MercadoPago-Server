import client from "../services/mercadoPagoServices.js";
import { Preference, Payment  } from "mercadopago";
import { generateKeysForOrder } from "../services/keyGeneration.js";
import { sendEmailFromBackend } from "../services/nodeMailer.js";

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
                    success: "http://localhost:5173/successfullpurchase",
                    //success: "https://www.youtube.com/watch?v=kXMpu07zjN4&list=PLQxX2eiEaqbwnzKnmqHDl0rkRvp_T7Q_W&index=29",
                    pending: "https://estoyesperando.com",
    failure: fallo
},
              //  auto_return:"approved",  // no funciona si las rutas de redirecion son localhost
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


 export const confirmPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "paymentId requerido" });
    }

    const payment = new Payment(client);
    const result = await payment.get({ id: paymentId });

    const paymentData = result.body;

    console.log("Consulta pago:", paymentData);

    if (paymentData.status !== "approved") {
      return res.json({ approved: false });
    }

    
    const orderId = paymentData.external_reference;

    
    // const order = await Order.findById(orderId);

  
    const demoItems = [
      { title: "Demo Game", quantity: 1 }
    ];

    const keys = generateKeysForOrder(demoItems);

    const keysText = keys
      .map(game =>
        `🎮 ${game.name}\n${game.keys.join("\n")}`
      )
      .join("\n\n");

    await sendEmailFromBackend(
      paymentData.payer.email,
      keysText
    );

    return res.json({
      approved: true,
      amount: paymentData.transaction_amount,
      payerEmail: paymentData.payer.email,
    });

  } catch (error) {
    console.error("Error confirmando pago:", error);
    return res.status(500).json({ error: "Error confirmando pago" });
  }
};