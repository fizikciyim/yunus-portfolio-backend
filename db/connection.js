const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1", // localhost yerine bunu kullan
  user: "root",
  password: "YeniParolanız123!",
  database: "backend",
});

db.connect((err) => {
  if (err) {
    console.error("Veritabanına bağlanılamadı:", err);
  } else {
    console.log("MySQL bağlantısı başarılı!");
  }
});

module.exports = db;
