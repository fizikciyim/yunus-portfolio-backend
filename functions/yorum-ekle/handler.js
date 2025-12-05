const db = require("./shared/db/db.js");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { kullaniciAdi, yorum } = body;

    if (!kullaniciAdi || !yorum) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Kullanıcı adı ve yorum gerekli." }),
      };
    }

    const sql =
      "INSERT INTO yorumlar (kullaniciAdi, yorum, tarih) VALUES (?, ?, NOW())";

    const [result] = await db.query(sql, [kullaniciAdi, yorum]);

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Yorum eklendi.",
        yorumId: result.insertId,
      }),
    };
  } catch (err) {
    console.error("Yorum ekleme hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Yorum eklenirken hata oluştu." }),
    };
  }
};
