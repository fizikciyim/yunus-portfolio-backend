const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Puan ekleme veya güncelleme
router.post("/", async (req, res) => {
  const { kullanici_id, resim_id, puan } = req.body;
  const kullaniciIdNum = parseInt(kullanici_id, 10);

  if (isNaN(kullaniciIdNum) || puan == null || resim_id == null) {
    return res
      .status(400)
      .json({ error: "Eksik veya geçersiz veri gönderildi" });
  }
  try {
    // Daha önce puan verilmiş mi kontrol et
    const [existing] = await db.execute(
      "SELECT * FROM puanlar WHERE kullanici_id = ? AND resim_id = ?",
      [kullaniciIdNum, resim_id]
    );

    if (existing.length > 0) {
      // Varsa güncelle
      await db.execute(
        "UPDATE puanlar SET puan = ?, tarih = NOW() WHERE kullanici_id = ? AND resim_id = ?",
        [puan, kullaniciIdNum, resim_id]
      );
    } else {
      // Yoksa yeni kayıt ekle
      await db.execute(
        "INSERT INTO puanlar (kullanici_id, resim_id, puan) VALUES (?, ?, ?)",
        [kullaniciIdNum, resim_id, puan]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Puan ekleme hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// 📊 Belirli bir resmin ortalama puanını getir
router.get("/ortalama/:resim_id", async (req, res) => {
  const { resim_id } = req.params;

  try {
    const resimIdNum = parseInt(resim_id, 10);
    // Eğer resim_id geçerli sayı değilse hata dönebilirsin
    if (isNaN(resimIdNum)) {
      return res.status(400).json({ error: "Geçersiz resim_id" });
    }

    const [rows] = await db.execute(
      "SELECT AVG(puan) AS ortalama, COUNT(*) AS toplam FROM puanlar WHERE resim_id = ?",
      [resimIdNum]
    );

    const ortalama = rows[0].ortalama
      ? parseFloat(rows[0].ortalama).toFixed(2)
      : null;
    const toplam = rows[0].toplam;

    res.json({ ortalama, toplam });
  } catch (err) {
    console.error("Ortalama puan alma hatası:", err);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
