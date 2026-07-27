# RIBAZ E-commerce MVP Website

এটি RIBAZ হোমমেড গুঁড়া মশলার জন্য React + Vite + Tailwind + Decap CMS ভিত্তিক static e-commerce style ওয়েবসাইট। এখানে কোনো database/Supabase/Firebase নেই। Product, package, price, image, contact info `/admin` থেকে edit করা যাবে এবং order WhatsApp/Messenger/Call-এ যাবে।

## ফিচার

- Animated homepage
- Products listing
- Separate product detail page
- Separate package detail page
- Cart with localStorage
- Checkout message generator
- WhatsApp pre-filled order message
- Messenger link + Copy order message
- Direct call button
- Decap CMS `/admin` panel
- Netlify deploy ready

## Local setup

1. Node.js install করুন: https://nodejs.org
2. ZIP extract করুন
3. Terminal/CMD খুলে project folder-এ যান
4. Run করুন:

```bash
npm install
npm run dev
```

তারপর browser-এ দেখুন:

```text
http://localhost:5173
```

## Netlify deploy

1. GitHub account খুলুন
2. নতুন repository তৈরি করুন, যেমন `ribaz-website`
3. এই project files upload করুন
4. Netlify.com এ login করুন
5. Add new site → Import from Git
6. GitHub repo select করুন
7. Build command: `npm run build`
8. Publish directory: `dist`
9. Deploy চাপুন

## Admin panel setup with Netlify Identity + Git Gateway

1. Netlify dashboard → আপনার site open করুন
2. Site configuration → Identity → Enable Identity
3. Registration preferences: Invite only করুন
4. Services → Git Gateway → Enable Git Gateway
5. Identity → Invite users → আপনার email invite করুন
6. Email থেকে invite accept করে password set করুন
7. Visit করুন:

```text
https://your-site-name.netlify.app/admin/
```

8. Login করুন
9. Products/Packages/Settings edit করুন
10. Save করলে GitHub repo update হবে এবং Netlify auto rebuild করবে

## WhatsApp number change

`/admin` → Pages & Settings → Contact Settings → WhatsApp Number

Number অবশ্যই country code সহ দিন। উদাহরণ:

```text
8801974673371
```

## Messenger link change

`/admin` → Pages & Settings → Contact Settings → Messenger Link

উদাহরণ:

```text
https://m.me/ribazbd
```

যদি m.me কাজ না করে, Facebook page-এর inbox link দিন।

## Product image upload

`/admin` → Products → যেকোনো Product → Images → Upload image → Save

Image ফাইল `public/uploads` ফোল্ডারে save হবে।

## Product add/edit

`/admin` → Products → New Product অথবা existing product edit করুন।
Slug ইংরেজিতে ছোট করে দিন। যেমন:

```text
premium-chili-powder
```

Slug অনুযায়ী product URL হবে:

```text
/product/premium-chili-powder
```

## Common error fixes

### Direct product link refresh দিলে 404
`public/_redirects` এবং `netlify.toml` ফাইলে redirect দেওয়া আছে। Netlify deploy-তে কাজ করবে।

### Admin login হচ্ছে না
Identity enabled কিনা এবং user invite accept করেছেন কিনা দেখুন। Git Gateway enabled থাকতে হবে।

### Save করার পর website update হচ্ছে না
Netlify build শেষ হওয়া পর্যন্ত অপেক্ষা করুন। Static site বলে save করার পর rebuild লাগে।

### WhatsApp message যাচ্ছে না
Contact settings-এ WhatsApp number country code সহ আছে কিনা দেখুন। 019... নয়, 88019... ব্যবহার করুন।

## Important

এটি MVP version। Order database নেই। Customer WhatsApp/Messenger/Call করে order confirm করবে।
