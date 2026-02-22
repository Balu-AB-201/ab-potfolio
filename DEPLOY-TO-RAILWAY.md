# 📱 Deploy AB Portfolio to Railway + Install on Phone

Follow these steps in order. Takes about 15–20 minutes total.

---

## STEP 1 — Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up"
3. Create a free account

---

## STEP 2 — Upload Your Project to GitHub

### Option A — Using GitHub Desktop (easiest)
1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in with your GitHub account
3. Click "Create a New Repository on your hard drive"
4. Name it: `ab-portfolio`
5. Drag and drop ALL your project files into the folder
6. Click "Commit to main"
7. Click "Publish repository" → make it Public

### Option B — Using GitHub website (drag & drop)
1. Go to https://github.com → click "New" (green button)
2. Name: `ab-portfolio` → Public → Create repository
3. Click "uploading an existing file"
4. Drag ALL your project files in
5. Click "Commit changes"

---

## STEP 3 — Create Railway Account
1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

---

## STEP 4 — Deploy on Railway

1. Click **"New Project"**
2. Click **"Deploy from GitHub repo"**
3. Select **"ab-portfolio"**
4. Railway will automatically detect it's a Java/Maven project
5. Wait 3–5 minutes for it to build

### Add MySQL Database:
1. In your project on Railway, click **"New"**
2. Choose **"Database"** → **"MySQL"**
3. Wait for it to start (1–2 minutes)
4. Click on the MySQL service → **"Variables"** tab
5. You'll see: MYSQLHOST, MYSQLPORT, MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD
   → These are automatically connected to your app! ✅

### Add Environment Variables:
1. Click on your **ab-portfolio service** (not MySQL)
2. Click **"Variables"** tab
3. Add these one by one:

| Variable Name       | Value                              |
|---------------------|-------------------------------------|
| JWT_SECRET          | any-long-random-string-here-2026   |
| MAIL_USERNAME       | your@gmail.com                     |
| MAIL_PASSWORD       | your-gmail-app-password            |
| STRIPE_SECRET_KEY   | sk_test_your_stripe_key            |
| CORS_ORIGINS        | (paste your Railway URL here after step 5) |

---

## STEP 5 — Get Your Live URL

1. Click on your service → **"Settings"** tab
2. Under "Domains" → click **"Generate Domain"**
3. You'll get a URL like: `https://ab-portfolio-production.up.railway.app`
4. **Copy this URL**

Now go back to Variables and set:
- CORS_ORIGINS = `https://ab-portfolio-production.up.railway.app`

---

## STEP 6 — Run the Database Schema

1. Click on MySQL service in Railway
2. Click **"Connect"** tab
3. Click **"MySQL Client"** (opens a terminal)
4. Paste the contents of `schema.sql` and press Enter
5. Your tables are created! ✅

---

## STEP 7 — Install on Your Phone 📱

### Android (Chrome):
1. Open Chrome on your Android phone
2. Go to your Railway URL (e.g. `https://ab-portfolio-production.up.railway.app`)
3. Wait for the page to fully load
4. Chrome will show a banner: **"Add AB Portfolio to Home screen"**
   — OR —
   Tap the **3-dot menu** (⋮) in Chrome → **"Add to Home screen"**
5. Tap **"Add"**
6. Done! 🎉 The app icon appears on your home screen like any other app

### iPhone (Safari):
1. Open Safari (NOT Chrome — iOS requires Safari for PWA install)
2. Go to your Railway URL
3. Tap the **Share button** (□ with arrow)
4. Scroll down → tap **"Add to Home Screen"**
5. Tap **"Add"**
6. Done! ✅

---

## STEP 8 — Test Your Installed App

Open the app from your home screen icon. You should see:
- ✅ It opens WITHOUT a browser address bar (looks like a real app!)
- ✅ It has your AB. icon
- ✅ The contact form works (sends email to you)
- ✅ Projects load from your database
- ✅ Admin panel at: your-url/admin.html

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Railway build fails | Check the build logs — usually a missing Java version. Add `JAVA_VERSION=17` to variables |
| Page won't install | Make sure you're on HTTPS (Railway gives this automatically) |
| "Add to Home Screen" not showing | Reload the page twice, wait 30 seconds |
| Database error | Make sure you ran schema.sql in the Railway MySQL client |
| Contact form not working | Check MAIL_USERNAME and MAIL_PASSWORD variables |

---

## Your App Features on Phone

Once installed, your phone app has:
- 📱 Works offline (shows cached version)
- 🔔 Can send push notifications (future)
- ⚡ Super fast (service worker caches files)
- 🔒 Secure (HTTPS by Railway)
- 💾 No Play Store needed
- 🆓 Free hosting on Railway (500 hours/month free)
