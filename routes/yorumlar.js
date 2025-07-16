const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Yorum ekle
router.post("/yorum-ekle", async (req, res) => {
  const { kullaniciAdi, yorum } = req.body;

  if (!kullaniciAdi || !yorum) {
    return res.status(400).json({ error: "Kullanıcı adı ve yorum gerekli." });
  }

  try {
    const sql =
      "INSERT INTO yorumlar (kullaniciAdi, yorum, tarih) VALUES (?, ?, NOW())";
    const [result] = await db.query(sql, [kullaniciAdi, yorum]);

    res
      .status(201)
      .json({ message: "Yorum eklendi.", yorumId: result.insertId });
  } catch (err) {
    console.error("Yorum ekleme hatası:", err);
    res.status(500).json({ error: "Yorum eklenirken hata oluştu." });
  }
});

// Yorumları getir
router.get("/yorumlar", async (req, res) => {
  try {
    const sql = "SELECT * FROM yorumlar ORDER BY tarih DESC";
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Yorumlar getirilirken hata oluştu." });
  }
});

// Yorum sil
router.delete("/yorum-sil/:id", async (req, res) => {
  const yorumId = req.params.id;
  const kullaniciAdi = req.query.kullaniciAdi;

  if (!kullaniciAdi) {
    return res.status(400).json({ error: "Kullanıcı adı gerekli." });
  }

  try {
    const sql = "DELETE FROM yorumlar WHERE id = ? AND kullaniciAdi = ?";
    const [result] = await db.query(sql, [yorumId, kullaniciAdi]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Yorum bulunamadı veya yetkiniz yok" });
    }

    res.json({ message: "Yorum başarıyla silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Yorum silinemedi" });
  }
});

module.exports = router;
