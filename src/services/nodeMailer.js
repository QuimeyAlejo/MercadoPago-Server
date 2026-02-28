import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, 
  },
});

export async function sendEmailFromBackend(to, keysText) {
  await transporter.sendMail({
    from: `"TheFrog Store" <${process.env.MAIL_USER}>`,
    to,
    subject: "🎮 Tus keys de compra",
    text: `Gracias por tu compra.\n\n${keysText}`,
  });
}