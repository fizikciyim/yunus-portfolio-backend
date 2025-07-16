const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/kayit", async (req, res) => {
  const { name, userName, password, confirmPassword, terms } = req.body;

  const sql =
    "INSERT INTO users (adSoyad, kullaniciAdi, sifre) VALUES (?, ?, ?)";

  try {
    const [result] = await db.query(sql, [name, userName, password]);
    res.status(200).json({ message: "Mesaj başarıyla alındı!" });
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
    if (user.sifre === password) {
      const kullanici = {
        id: user.id,
        userName: user.kullaniciAdi,
      };
      return res.status(200).json({ message: "Giriş başarılı!", kullanici });
    } else {
      return res.status(401).json({ error: "Şifre yanlış." });
    }
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

module.exports = router;
