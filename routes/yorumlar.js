// const express = require("express");
// const router = express.Router();
// const db = require("../db/connection");

// router.post("/yorum-ekle", (req, res) => {
//   const { kullaniciAdi, yorum } = req.body;

//   if (!kullaniciAdi || !yorum) {
//     return res.status(400).json({ error: "Kullanıcı adı ve yorum gerekli." });
//   }

//   const sql =
//     "INSERT INTO yorumlar (kullaniciAdi, yorum, tarih) VALUES (?, ?, NOW())";

//   db.query(sql, [kullaniciAdi, yorum], (err, result) => {
//     if (err) {
//       console.error("Yorum ekleme hatası:", err);
//       return res.status(500).json({ error: "Yorum eklenirken hata oluştu." });
//     }

//     res
//       .status(201)
//       .json({ message: "Yorum eklendi.", yorumId: result.insertId });
//   });
// });

// router.get("/yorumlar", (req, res) => {
//   const sql = "SELECT * FROM yorumlar ORDER BY tarih DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res
//         .status(500)
//         .json({ error: "Yorumlar getirilirken hata oluştu." });
//     }
//     res.json(results);
//   });
// });

// router.delete("/yorum-sil/:id", (req, res) => {
//   const yorumId = req.params.id;
//   const kullaniciAdi = req.query.kullaniciAdi;

//   console.log("Silinecek yorumId:", yorumId);
//   console.log("KullaniciAdi:", kullaniciAdi);

//   if (!kullaniciAdi) {
//     return res.status(400).json({ error: "Kullanıcı adı gerekli." });
//   }

//   const sql = "DELETE FROM yorumlar WHERE id = ? AND kullaniciAdi = ?";
//   db.query(sql, [yorumId, kullaniciAdi], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Yorum silinemedi" });
//     }

//     if (result.affectedRows === 0) {
//       return res
//         .status(404)
//         .json({ error: "Yorum bulunamadı veya yetkiniz yok" });
//     }

//     res.json({ message: "Yorum başarıyla silindi" });
//   });
// });

// module.exports = router;

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
