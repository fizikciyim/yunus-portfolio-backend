const db = require("./shared/db/db.js");

exports.handler = async (event) => {
  try {
    const yorumId = event.pathParameters?.id;
    const kullaniciAdi = event.queryStringParameters?.kullaniciAdi;

    if (!kullaniciAdi) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Kullanıcı adı gerekli." }),
      };
    }

    const sql = "DELETE FROM yorumlar WHERE id = ? AND kullaniciAdi = ?";
    const [result] = await db.query(sql, [yorumId, kullaniciAdi]);

    if (result.affectedRows === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Yorum bulunamadı veya yetkiniz yok",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Yorum başarıyla silindi" }),
    };
  } catch (err) {
    console.error("Yorum silme hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Yorum silinemedi" }),
    };
  }
};
