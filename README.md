# Kişisel Portföy Web Sitesi (Backend Deposu)

Merhaba! Bu proje, yazılım geliştirme alanındaki yetkinliklerimi ve projelerimi sergilemek amacıyla oluşturduğum **kişisel portföy sitemin backend deposudur**.  
Full-stack geliştirme yeteneklerimi göstermek için hem frontend hem de backend taraflarını sıfırdan oluşturdum. Backend altyapısı daha sonra **AWS Serverless mimarisine** taşınmıştır.

🔗 **Canlı Portföy Sitem:** https://yunuskarasen.com

---

## 💡 Özellikler

- Mobil uyumlu modern tasarım
- Hakkımda sayfası
- Proje tanıtım bölümü
- API destekli iletişim formu
- Kullanıcı kayıt ve giriş sistemi
- Yorum ekleme özelliği (sadece kayıtlı kullanıcılar)

---

## 🛠️ Kullanılan Teknolojiler

### ✅ Frontend

- HTML5, CSS3, JavaScript (ES6+)
- React.js
- React Router
- Bootstrap 5

### ✅ Backend (AWS Serverless)

Backend artık klasik Express sunucusunda değil, tamamen AWS servisleri üzerinde çalışmaktadır:

- **AWS Lambda** – Tüm API fonksiyonları
- **API Gateway** – REST API yönetimi
- **AWS RDS (MySQL)** – Veritabanı
- **AWS VPC & Security Groups** – Ağ katmanı ve güvenlik
- **CloudWatch** – Loglama ve hata takibi

Bu yapı sayesinde sunucu yönetimi ortadan kalkmış, otomatik ölçeklenebilir ve maliyet-etkin bir mimariye geçilmiştir.

---

## ⚙️ Kurulum Talimatları

Bu proje iki ayrı repository’den oluşmaktadır:

- 🎨 **Frontend (React):**  
  https://github.com/fizikciyim/yunus-portfolio

- 🛠️ **Backend (AWS Lambda kodları):**  
  https://github.com/fizikciyim/yunus-portfolio-backend

---

## 🔽 Backend Kurulumu Artık Gerekmez

Backend tamamen AWS üzerinde çalıştığı için:

- Sunucu kurmanıza gerek yoktur
- `npm install`, `.env`, `npm run dev` gibi işlemler kullanılmaz
- Tüm fonksiyonlar AWS Lambda’da çalışır
- Frontend doğrudan **API Gateway endpointlerine** bağlanır

Bu repo yalnızca Lambda fonksiyonlarının kaynak kodlarını içerir.

---

## 🔽 Frontend’i Lokal Olarak Çalıştırmak İsterseniz

```bash
git clone https://github.com/fizikciyim/yunus-portfolio.git
cd yunus-portfolio
npm install
npm run dev
```
