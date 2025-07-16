const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Tüm alanlar doldurulmalı." });
  }

  const text = `
📥 Yeni İletişim Mesajı
────────────────────────
👤 Ad: ${name}
📧 E-posta: ${email}
📌 Konu: ${subject}
💬 Mesaj: ${message}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text,
    });

    res.status(200).json({ success: true, message: "Mesaj gönderildi." });
  } catch (error) {
    console.error("Telegram gönderme hatası:", error.message);
    res.status(500).json({ error: "Mesaj gönderilemedi." });
  }
});

module.exports = router;
