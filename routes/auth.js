const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/kayit", async (req, res) => {
  const { name, userName, password, confirmPassword, terms } = req.body;

  const sql =
    "INSERT INTO users (adSoyad, kullaniciAdi, sifre) VALUES (?, ?, ?)";

  // try {
  //   const [result] = await db.query(sql, [name, userName, password]);
  //   res.status(200).json({ message: "Mesaj başarıyla alındı!" });
  // } catch (err) {
  //   console.error("Kayıt hatası:", err);
  //   res.status(500).json({ error: "Kayıt sırasında hata oluştu" });
  // }
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    await db.query(sql, [name, userName, hashedPassword]);
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

    // if (user.sifre === password) {
    //   const kullanici = {
    //     id: user.id,
    //     userName: user.kullaniciAdi,
    //   };
    //   return res.status(200).json({ message: "Giriş başarılı!", kullanici });
    // } else {
    //   return res.status(401).json({ error: "Şifre yanlış." });
    // }
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

module.exports = router;
