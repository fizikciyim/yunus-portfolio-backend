const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/kayit", async (req, res) => {
  console.log("📥 Kayıt isteği geldi:", req.body); // 👈 buraya koy

  const { name, userName, password, email } = req.body;

  const sql =
    "INSERT INTO users (adSoyad, kullaniciAdi, email, sifre) VALUES (?, ?, ?, ?)";

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    await db.query(sql, [name, userName, email, hashedPassword]);
    res.status(200).json({ message: "Kayıt başarılı!" });
  } catch (err) {
    console.error("Kayıt hatası:", err);
    res.status(500).json({ error: "Kayıt sırasında hata oluştu" });
  }
});

router.post("/giris", async (req, res) => {
  const { userName, password } = req.body;

  const sql =
    "SELECT id, kullaniciAdi, sifre FROM users WHERE kullaniciAdi = ?";

  try {
    const [result] = await db.query(sql, [userName]);
    if (result.length === 0) {
      return res.status(401).json({ error: "Kullanıcı bulunamadı." });
    }

    const user = result[0];
    const isPasswordMatch = await bcrypt.compare(password, user.sifre);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Şifre yanlış." });
    }
    const token = jwt.sign(
      { id: user.id, userName: user.kullaniciAdi },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Giriş başarılı!", token });
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

router.post("/sifre-sifirla", async (req, res) => {
  const { email } = req.body;

  try {
    // Kullanıcıyı email ile bul
    const [rows] = await db.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Bu e-posta ile kayıtlı kullanıcı yok." });
    }

    const user = rows[0];
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpire = new Date(Date.now() + 3600000); // 1 saat geçerli

    // Token'ı veritabanına kaydet
    await db.query(
      "UPDATE users SET resetToken = ?, tokenExpire = ? WHERE id = ?",
      [resetToken, tokenExpire, user.id]
    );

    const resetLink = `http://localhost:5173/yeni-sifre/${resetToken}`;

    // Mail içeriği
    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Şifre Sıfırlama Talebi",
      html: `<p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
             <a href="${resetLink}">${resetLink}</a>
             <p>Bu bağlantı 1 saat geçerlidir.</p>`,
    };

    // Mail gönder
    await sgMail.send(msg);

    res.json({
      message: "Şifre sıfırlama linki e-posta adresinize gönderildi.",
    });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    res.status(500).json({ error: "Mail gönderilemedi." });
  }
});
module.exports = router;
