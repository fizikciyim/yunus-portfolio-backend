require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

const authRoutes = require("./routes/auth");
const yorumRoutes = require("./routes/yorumlar");
const contactRoutes = require("./routes/contact");
const puanlarRoutes = require("./routes/rating");

// app.use(
//   cors({
//     origin: ["https://yunuskarasen.com", "https://api.yunuskarasen.com"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // <-- DELETE EKLENMELİ
//     credentials: true,
//   })
// );

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", yorumRoutes);
app.use("/api", contactRoutes);
app.use("/api/puanlar", puanlarRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
