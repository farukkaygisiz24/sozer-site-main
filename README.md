# ORTUNÇ YGM — Kurumsal Web Sitesi (v2)

ORTUNÇ YGM için Next.js tabanlı kurumsal web sitesi — **v2 redesign**.

**Repo:** https://github.com/farukkaygisiz24/ortunc-site-main-v2

Önceki sürüm (v1): https://github.com/farukkaygisiz24/ortuncygm-site (`origin-v1` remote)

## Git

```bash
git push          # v2 → origin (ortunc-site-main-v2)
git push origin-v1 main   # yalnızca v1'e göndermek isterseniz
```

## Teknoloji

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Statik export (`output: 'export'`) veya standalone sunucu modu

## Geliştirme

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Paylaşım paketi

Kişisel / yerel dosyalar hariç zip oluşturmak için:

```bash
npm run package:share
```

Üst klasörde `ortunc-site-main-v2-share.zip` oluşur (klasör adına göre). Zip içinde **yoktur**:

- `.git` (commit geçmişi, yazar bilgileri)
- `node_modules`, `.next`, `out`, `.cache`
- `.cursor`, `.claude`, `.vercel`

Alıcı zip'i açıp `npm install && npm run dev` ile çalıştırabilir.

## Derleme

```bash
npm run build
```

Statik çıktı `out/` klasöründe oluşur.
