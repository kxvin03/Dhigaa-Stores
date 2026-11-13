# Launching Dhigaa Fashions to Public Domain (dhigaafashions.com)

This guide walks you through deploying your production boutique e-commerce application to **https://dhigaafashions.com** with free SSL, global CDN, and automated zero-downtime updates.

---

## Architecture Overview

```
                      +-----------------------------+
                      |   Domain: dhigaafashions.com |
                      +--------------+--------------+
                                     |
                                     v
                        [ Vercel Edge Global CDN ]
                        (Free Auto SSL, Next.js 14)
                                     |
                +--------------------+--------------------+
                |                                         |
                v                                         v
   [ Customer Storefront ]                     [ Executive Admin Suite ]
   - 3D Floating Silk Cloth Hero               - Live Sales Dashboard
   - 24 Saree & Handloom Catalog               - Order Fulfillment & Invoicing
   - Razorpay Online Checkout                  - Tailor & Bridal Manager
   - WhatsApp Enquiries (+91 9092806555)       - Live Theme Editor
                |                                         |
                +--------------------+--------------------+
                                     |
                                     v
                       [ Cloud Serverless Postgres ]
                         (Neon.tech or Supabase.com)
```

---

## Step 1: Create a Free Cloud PostgreSQL Database (2 Minutes)

Because Vercel runs on serverless architecture across the globe, SQLite (`dev.db`) is replaced with a free cloud PostgreSQL database:

1. Go to **[Neon.tech](https://neon.tech)** (or **[Supabase.com](https://supabase.com)**).
2. Sign in with GitHub or Google and click **Create Project**.
3. Name your project: `dhigaa-fashions` (Region: `AWS Asia Pacific - Mumbai / Singapore`).
4. Copy the **Connection String** (it looks like):
   ```
   postgresql://dhigaa_owner:secret_password@ep-cold-star-123456.ap-southeast-1.aws.neon.tech/dhigaa?sslmode=require
   ```

---

## Step 2: Switch Prisma to PostgreSQL & Migrate

In your terminal or project folder:

1. Open `prisma/schema.prisma` and change line 7 from:
   ```prisma
   provider = "sqlite"
   ```
   to:
   ```prisma
   provider = "postgresql"
   ```

2. Set your `DATABASE_URL` in `.env`:
   ```bash
   DATABASE_URL="postgresql://dhigaa_owner:secret_password@ep-cold-star-123456.ap-southeast-1.aws.neon.tech/dhigaa?sslmode=require"
   ```

3. Push the schema and seed the initial boutique data:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
   *(This instantly creates all 26 database tables and seeds all 24 curated products from `products.csv` and the admin account `dhigaafashions@gmail.com`)*

---

## Step 3: Deploy to Vercel (2 Minutes)

### Option A: Via GitHub (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: launch Dhigaa Fashions production boutique"
   ```
2. Create a new repository on your GitHub account (e.g., `dhigaa-fashions`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/dhigaa-fashions.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **[vercel.com](https://vercel.com)**, sign in with GitHub, and click **Add New > Project**.
5. Select the `dhigaa-fashions` repository.
6. Under **Environment Variables**, add:
   - `DATABASE_URL` = *(Your Neon/Supabase PostgreSQL connection string)*
   - `JWT_SECRET` = `dhigaa_jwt_production_secret_key_2026_super_secure`
   - `NEXT_PUBLIC_APP_URL` = `https://dhigaafashions.com`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `+919092806555`
   - `RAZORPAY_KEY_ID` = *(Your Razorpay Live Key Id)*
   - `RAZORPAY_KEY_SECRET` = *(Your Razorpay Live Secret)*
7. Click **Deploy**. Vercel will build and assign a live URL in ~60 seconds.

### Option B: Direct CLI Deployment
If you prefer not using GitHub:
```bash
npx vercel
```
Follow the interactive prompts to log in, link the project, and deploy. Then run:
```bash
npx vercel --prod
```

---

## Step 4: Connect Domain `dhigaafashions.com` (1 Minute)

1. In your **Vercel Project Dashboard**, navigate to **Settings > Domains**.
2. Type `dhigaafashions.com` and click **Add**.
   - Vercel will also suggest adding `www.dhigaafashions.com` (Select **Redirect dhigaafashions.com to www.dhigaafashions.com** or vice versa).
3. Vercel will display the exact DNS records needed.

---

## Step 5: Configure DNS at Your Domain Registrar

Log in to wherever you purchased **dhigaafashions.com** (GoDaddy, Namecheap, Hostinger, Cloudflare, Google/Squarespace):

Go to **DNS Management / DNS Records** and add:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Auto / 1 Hour |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Auto / 1 Hour |

> [!NOTE]
> DNS propagation typically takes between 2 to 30 minutes. Once detected, Vercel automatically generates and installs an SSL certificate for free. Your boutique will be live and secure at `https://dhigaafashions.com`!

---

## Step 6: Post-Launch Admin Verification

1. Go to `https://dhigaafashions.com/admin/login`
2. Sign in with:
   - **Email:** `dhigaafashions@gmail.com`
   - **Temporary Password:** `Dhigaa@2026`
3. The platform will automatically prompt you to set your new permanent, secure password on first login.
4. Access the **Live Theme Editor**, review live incoming orders, manage custom tailoring requests, and inspect real-time sales metrics.

