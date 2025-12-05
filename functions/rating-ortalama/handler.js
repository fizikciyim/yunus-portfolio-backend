const db = require("./shared/db/db.js");

exports.handler = async (event) => {
  try {
    const resim_id = event.pathParameters?.resim_id;

    const resimIdNum = parseInt(resim_id, 10);
    if (isNaN(resimIdNum)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Geçersiz resim_id" }),
      };
    }

    const [rows] = await db.execute(
      "SELECT AVG(puan) AS ortalama, COUNT(*) AS toplam FROM puanlar WHERE resim_id = ?",
      [resimIdNum]
    );

    const ortalama = rows[0].ortalama
      ? parseFloat(rows[0].ortalama).toFixed(2)
      : null;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ortalama,
        toplam: rows[0].toplam,
      }),
    };
  } catch (err) {
    console.error("Ortalama puan alma hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sunucu hatası" }),
    };
  }
};
