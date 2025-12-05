const db = require("./shared/db/db.js");

exports.handler = async () => {
  try {
    const sql = "SELECT * FROM yorumlar ORDER BY tarih DESC";
    const [results] = await db.query(sql);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (err) {
    console.error("Yorumlar getirilirken hata:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Yorumlar getirilirken hata oluştu." }),
    };
  }
};
