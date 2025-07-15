require("dotenv").config();

const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = 3001;

const authRoutes = require("./routes/auth");
const yorumRoutes = require("./routes/yorumlar");

// app.use(
//   cors({
//     origin: ["https://yunuskarasen.com", "https://api.yunuskarasen.com"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // <-- DELETE EKLENMELİ
//     credentials: true,
//   })
// );

app.use(cors());
app.use(express.json());

// Route'ları kullan
app.use("/api", authRoutes);
app.use("/api", yorumRoutes);
app.use("/api", contactRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
