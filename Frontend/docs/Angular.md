# Angular Projesi Dokümantasyonu

## İçindekiler
1. [Proje Yapısı](#proje-yapısı)
2. [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
3. [Bileşenler](#bileşenler)
4. [Servisler](#servisler)
5. [Routing](#routing)
6. [Stil ve Tema](#stil-ve-tema)
7. [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)

## Proje Yapısı

```
Frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── main-layout/
│   │   │   │   │   ├── main-layout.component.ts
│   │   │   │   │   ├── main-layout.component.html
│   │   │   │   │   └── main-layout.component.css
│   │   │   ├── home/
│   │   │   ├── todo/
│   │   │   └── about/
│   │   ├── services/
│   │   ├── models/
│   │   └── app.module.ts
│   ├── assets/
│   └── styles.scss
├── package.json
└── angular.json
```

## Kullanılan Teknolojiler

- **Angular**: 17.x
- **Angular Material**: UI bileşenleri için
- **TypeScript**: Programlama dili
- **SCSS**: Stil dosyaları için
- **RxJS**: Reaktif programlama için

## Bileşenler

### Main Layout Component
Ana sayfa düzenini oluşturan bileşen. İçerir:
- Üst menü (Header)
- Sol menü (Sidebar)
- İçerik alanı (Content)

#### Özellikler
- Responsive tasarım
- Mobil uyumlu menü
- Kullanıcı menüsü
- Logo ve başlık alanı

#### Kullanılan Material Bileşenleri
- `mat-sidenav-container`
- `mat-sidenav`
- `mat-toolbar`
- `mat-icon`
- `mat-menu`
- `mat-list`
- `mat-divider`

### Sayfa Bileşenleri
1. **Home Component**
   - Ana sayfa içeriği
   - Karşılama mesajı

2. **Todo Component**
   - Yapılacaklar listesi
   - Görev ekleme/düzenleme/silme

3. **About Component**
   - Hakkında sayfası
   - Proje bilgileri

## Servisler

### Auth Service
- Kullanıcı kimlik doğrulama
- Token yönetimi
- Oturum kontrolü

### Todo Service
- Yapılacaklar listesi yönetimi
- CRUD operasyonları
- API entegrasyonu

## Routing

```typescript
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'todo', component: TodoComponent },
      { path: 'about', component: AboutComponent }
    ]
  }
];
```

## Stil ve Tema

### Renk Paleti
- Primary: #1976d2 (Mavi)
- Accent: #DD0031 (Kırmızı)
- Background: #ffffff
- Text: #000000

### Özel Stiller
- Logo animasyonu
- Responsive tasarım
- Material Design uyumlu bileşenler

## Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18.x veya üzeri)
- npm (v9.x veya üzeri)
- Angular CLI (v17.x)

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
ng serve

# Production build
ng build
```

### Komutlar
- `ng serve`: Geliştirme sunucusunu başlatır
- `ng build`: Production build oluşturur
- `ng test`: Unit testleri çalıştırır
- `ng lint`: Kod kalitesi kontrolü yapar

## Best Practices

1. **Component Yapısı**
   - Her component kendi klasöründe
   - Component, template ve stil dosyaları ayrı
   - Lazy loading kullanımı

2. **Servis Kullanımı**
   - Singleton pattern
   - Dependency injection
   - HTTP istekleri için interceptor kullanımı

3. **State Management**
   - RxJS ile reaktif programlama
   - Service-based state management

4. **Performans**
   - Lazy loading
   - Change detection stratejisi
   - Bundle optimizasyonu

## Güvenlik

1. **Authentication**
   - JWT token kullanımı
   - Route guard implementasyonu
   - HTTP interceptor ile token yönetimi

2. **Authorization**
   - Role-based access control
   - Route guard ile yetkilendirme

## Deployment

1. **Build**
   ```bash
   ng build --configuration production
   ```

2. **Output**
   - `/dist/frontend` klasöründe oluşturulur
   - Optimize edilmiş ve sıkıştırılmış dosyalar

3. **Hosting**
   - Herhangi bir statik web sunucusu
   - Nginx, Apache vb. 