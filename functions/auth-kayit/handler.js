const db = require("./shared/db/db.js");
const bcrypt = require("bcrypt");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, userName, password, email } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (adSoyad, kullaniciAdi, email, sifre) VALUES (?, ?, ?, ?)";

    await db.query(sql, [name, userName, email, hashedPassword]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Kayıt başarılı!" }),
    };
  } catch (err) {
    console.error("Kayıt hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Kayıt sırasında hata oluştu" }),
    };
  }
};
