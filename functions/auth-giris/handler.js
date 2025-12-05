const db = require("./shared/db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { userName, password } = body;

    const sql =
      "SELECT id, kullaniciAdi, sifre FROM users WHERE kullaniciAdi = ?";

    const [result] = await db.query(sql, [userName]);

    if (result.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Kullanıcı bulunamadı." }),
      };
    }

    const user = result[0];
    const isPasswordMatch = await bcrypt.compare(password, user.sifre);

    if (!isPasswordMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Şifre yanlış." }),
      };
    }

    const token = jwt.sign(
      { id: user.id, userName: user.kullaniciAdi },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Giriş başarılı!", token }),
    };
  } catch (err) {
    console.error("Giriş hatası:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sunucu hatası." }),
    };
  }
};
