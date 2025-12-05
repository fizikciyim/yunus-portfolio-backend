const axios = require("axios");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Tüm alanlar doldurulmalı." }),
      };
    }

    const text = `
📥 Yeni İletişim Mesajı
────────────────────────
👤 Ad: ${name}
📧 E-posta: ${email}
📌 Konu: ${subject}
💬 Mesaj: ${message}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: text,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Mesaj gönderildi." }),
    };
  } catch (error) {
    console.error("Telegram gönderme hatası:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Mesaj gönderilemedi." }),
    };
  }
};
