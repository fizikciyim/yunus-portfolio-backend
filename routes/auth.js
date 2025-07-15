const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.post("/kayit", (req, res) => {
  const { name, userName, password, confirmPassword, terms } = req.body;

  const sql =
    "INSERT INTO users (adSoyad, kullaniciAdi, sifre) VALUES (?, ?, ?)";
  db.query(sql, [name, userName, password], (err, result) => {
    if (err) {
      console.error("Kayıt hatası:", err);
      return res.status(500).json({ error: "Kayıt sırasında hata oluştu" });
    }
    res.status(200).json({ message: "Mesaj başarıyla alındı!" });
  });
});

router.post("/giris", (req, res) => {
  const { userName, password } = req.body;

  const sql =
    "SELECT id, kullaniciAdi, sifre FROM users WHERE kullaniciAdi = ?";
  db.query(sql, [userName], (err, result) => {
    if (err) {
      console.error("Veritabanı hatası:", err);
      return res.status(500).json({ error: "Sunucu hatası." });
    }
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
  });
});

module.exports = router;
