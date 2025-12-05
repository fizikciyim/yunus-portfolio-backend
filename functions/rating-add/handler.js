const db = require("./shared/db/db.js");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { kullanici_id, resim_id, puan } = body;

    const kullaniciIdNum = parseInt(kullanici_id, 10);

    if (isNaN(kullaniciIdNum) || puan == null || resim_id == null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Eksik veya geçersiz veri gönderildi" }),
      };
    }

    // Daha önce puan verilmiş mi kontrol et
    const [existing] = await db.execute(
      "SELECT * FROM puanlar WHERE kullanici_id = ? AND resim_id = ?",
      [kullaniciIdNum, resim_id]
    );

    if (existing.length > 0) {
      await db.execute(
        "UPDATE puanlar SET puan = ?, tarih = NOW() WHERE kullanici_id = ? AND resim_id = ?",
        [puan, kullaniciIdNum, resim_id]
      );
    } else {
      await db.execute(
        "INSERT INTO puanlar (kullanici_id, resim_id, puan) VALUES (?, ?, ?)",
        [kullaniciIdNum, resim_id, puan]
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Puan ekleme hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sunucu hatası" }),
    };
  }
};
