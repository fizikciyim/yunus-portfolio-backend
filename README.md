# Kişisel Portföy Web Sitesi (Backend Deposu)

Merhaba! Bu proje, yazılım geliştirme alanındaki yetkinliklerimi ve projelerimi sergilemek amacıyla oluşturduğum **kişisel portföy sitemdir**. Full-stack geliştirme yeteneklerimi göstermek için hem frontend hem backend taraflarını sıfırdan oluşturdum.

🔗 [Portföy Sitemi Buradan Ziyaret Edin](https://yunuskarasen.com)

## 💡 Özellikler

- Mobil uyumlu tasarım
- Hakkımda sayfası
- Proje tanıtım bölümü
- İletişim formu (API destekli)
- Kullanıcı kayıt ve giriş sistemi
- Yorumlar bölümü (Kayıtlı kullanıcılar yorum bırakabilir)

## Kullanılan Teknolojiler

### ✅ Frontend

- HTML5, CSS3, JavaScript (ES6+)
- React.js
- Bootstrap 5
- React Router

### ✅ Backend

- Node.js
- Express.js
- MySQL
- RESTful API

## ⚙️ Kurulum Talimatları

Bu proje iki ayrı repository'den oluşur:

- 🎨 **Frontend (React):** [https://github.com/fizikciyim/yunus-portfolio](https://github.com/fizikciyim/yunus-portfolio)
- 🛠️ **Backend (Node.js + Express):** [https://github.com/fizikciyim/yunus-portfolio-backend](https://github.com/fizikciyim/yunus-portfolio-backend)

### 🔽 1. Backend Kurulumu

1. Backend reposunu klonlayın:

```bash
git clone https://github.com/fizikciyim/yunus-portfolio-backend.git
cd yunus-portfolio-backend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. .env dosyasını oluşturun ve doldurun.

```
TELEGRAM_BOT_TOKEN=tokeniniz
TELEGRAM_CHAT_ID=chat_idniz
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senin_sifren
DB_NAME=veritabani_isminiz
```

4. Backendi başlatın:

```
npm run dev
```

### 🔽 2. Frontend Kurulumu

```bash
git clone https://github.com/fizikciyim/yunus-portfolio.git
cd yunus-portfolio
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Frontendi başlatın:

```
npm run dev
```

### ✅ Kurulum Sonrası

- http://localhost:5173 adresinden frontend arayüzüne erişebilirsiniz.
- http://localhost:3001/api adresi backend API’nizdir.
- Giriş-kayıt işlemleri, yorum gönderme ve diğer API talepleri bu altyapı üzerinden gerçekleşir.
