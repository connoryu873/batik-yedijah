# Batik Yedijah — Modern Batik Fashion with AI Styling

A Next.js web application featuring AI-powered batik recommendations, design generation, and virtual try-on for a modern Indonesian fashion brand.

## Features

✨ **AI Personal Stylist** — Body type, skin tone, occasion, style preference → personalized recommendations  
🎨 **AI Design Generator** — Create unique batik concepts with traditional + modern aesthetics  
📸 **Virtual Try-On** — Upload photo, see how garments look before buying  
🛍️ **Product Catalog** — 6 curated modern batik pieces with live generative pattern previews  
📱 **Responsive Design** — Works on desktop, tablet, mobile  

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Git

### 2. Clone or Download
```bash
# If you have git
git clone https://github.com/yourusername/batik-yedijah.git
cd batik-yedijah

# Or download and extract the folder
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Anthropic API key
# Get your key from: https://console.anthropic.com/
```

Your `.env.local` should look like:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
```

### 5. Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser. 

The AI features will work immediately because the API calls go through your backend proxy (`/api/claude`), which uses your API key securely.

---

## Deploy to Vercel (Live Website) — 5 Minutes

Vercel is the easiest way to deploy Next.js apps. It's free for hobby projects.

### Step 1: Push Code to GitHub
```bash
# Initialize git repo (if not already done)
git init
git add .
git commit -m "Initial commit - Batik Yedijah website"

# Create a new repo on GitHub: github.com/new
# Name it "batik-yedijah"

# Connect and push
git remote add origin https://github.com/yourusername/batik-yedijah.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Click "Import Git Repository"
4. Paste your GitHub repo URL or connect your GitHub account
5. Select the `batik-yedijah` repo
6. Click "Import"

**Vercel will auto-detect it's a Next.js app.** You don't need to configure anything.

### Step 3: Add API Key
Before deploying, add your Anthropic API key:

1. In Vercel: go to your project Settings
2. Click "Environment Variables"
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-xxxxxxxxxxxxxxxxxxxx` (your actual key)
4. Click "Save"

### Step 4: Deploy
1. Click the "Deploy" button
2. Wait 2-3 minutes
3. Your site is live at: `https://batik-yedijah.vercel.app` (or your custom domain)

**Every time you push to GitHub, Vercel auto-redeploys.**

---

## Project Structure

```
batik-yedijah/
├── app/
│   ├── page.jsx              # Main React component (all pages)
│   ├── layout.jsx            # Next.js layout
│   └── api/
│       └── claude/
│           └── route.js      # Claude API proxy (keeps key safe)
├── package.json              # Dependencies
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## How AI Features Work

### AI Personal Stylist
1. User selects: body type, skin tone, occasion, style preference
2. Frontend sends prompt to `/api/claude`
3. Backend safely proxies to Claude API using `ANTHROPIC_API_KEY`
4. Claude returns personalized recommendations as JSON
5. Frontend displays results

### AI Design Generator
1. User selects: motif, color palette, mood, use case
2. Same flow → Claude generates a design concept with name, story, color narrative
3. Live SVG preview updates as user changes selections

### Virtual Try-On
- Upload UI with product selector
- Real Revery.ai SDK integration would require backend image processing
- Current demo shows the UI/flow

---

## Customize

### Change Colors
Edit the `C` object in `app/page.jsx`:
```javascript
const C = {
  bg: "#FDF6EC",        // background
  accent: "#B8511F",    // button color
  text: "#1C0F07",      // text color
  // ... etc
};
```

### Add/Edit Products
Edit the `PRODUCTS` array in `app/page.jsx`:
```javascript
const PRODUCTS = [
  { id:1, name:"Parang Modern Kemeja", cat:"tops", price:"Rp 165.000", ... },
  // Add more products here
];
```

### Change Brand Name
Search for "Batik Yedijah" in `app/page.jsx` and replace.

---

## Troubleshooting

### "API key not set" error
- Make sure `.env.local` exists in the root folder
- Verify `ANTHROPIC_API_KEY=` is set correctly
- Restart dev server: `Ctrl+C` then `npm run dev`

### AI features don't work locally
- Check that `.env.local` exists and has your API key
- Your API key must have Claude API access from [console.anthropic.com](https://console.anthropic.com)
- Check browser Console (F12) for error messages

### Deployment fails on Vercel
- Verify API key is set in Vercel project Settings > Environment Variables
- Make sure `.env.local` is in `.gitignore` (don't commit secrets!)
- Check Vercel deployment logs for specific errors

---

## Get Your Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to API Keys
4. Create a new key
5. Copy it into `.env.local` and Vercel settings

---

## Cost

- **Local development:** Free
- **Vercel hosting:** Free tier (12 serverless function invocations/month, 1000 edge function invocations/month)
- **Claude API calls:** Pay-as-you-go. ~$0.003 per stylist/design call. Budget ~$50/month for a small launch.

---

## Production Tips

1. **Add rate limiting** — Prevent API abuse with middleware
2. **Cache recommendations** — Store popular stylist results to reduce API calls
3. **Error handling** — Better error messages for users
4. **Analytics** — Track which features users use most
5. **Form validation** — Validate inputs before sending to Claude
6. **Custom domain** — Go to Vercel Settings > Domains to add your own

---

## Next Steps

- [ ] Deploy to Vercel
- [ ] Test all AI features live
- [ ] Add to Instagram bio as a link
- [ ] Share with customers
- [ ] Monitor API costs
- [ ] Collect feedback

---

## Questions?

- Vercel docs: https://vercel.com/docs
- Next.js docs: https://nextjs.org/docs
- Anthropic docs: https://docs.anthropic.com

---

**Built with Next.js + React + Anthropic Claude API**  
© 2026 Batik Yedijah
