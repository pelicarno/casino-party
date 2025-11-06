# 🚀 Deployment Instructions for Vegas Nights Casino App

## ✅ Current Status

Your app is fully configured and ready to deploy!

- ✅ Vue 3 app built
- ✅ JSONBin.io configured
  - **Bin ID:** 690cf90b43b1c97be99d5d4d
  - **Bin Name:** casino-bin
- ✅ Environment variables set locally
- ✅ Code committed to Git

---

## 🌐 Deploy to Vercel (5 Minutes)

### Step 1: Ensure Code is Pushed to GitHub

```bash
cd /Users/pelicarno/Olarm/casino-party
git status
# If there are changes:
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Go to Vercel

1. Open [https://vercel.com](https://vercel.com)
2. Sign in with GitHub (or create account)
3. Click **"Add New"** → **"Project"**

### Step 3: Import Your Repository

1. Find and select **"casino-party"** from your repositories
2. Click **"Import"**

### Step 4: Configure Project

**Framework Preset:** Vite (should auto-detect)

**Build & Output Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

(These should be auto-configured)

### Step 5: Add Environment Variables

⚠️ **IMPORTANT:** Before clicking Deploy, expand the **"Environment Variables"** section:

Add these two variables:

**Variable 1:**
```
Name:  VITE_JSONBIN_API_KEY
Value: $2a$10$J2jA2dLOdzqKAU7gukAhBu17r9HgG808adRDdeuTKRMZ2NNaZXHJu
```
Select: Production, Preview, Development (all 3)

**Variable 2:**
```
Name:  VITE_BIN_ID
Value: 690cf90b43b1c97be99d5d4d
```
Select: Production, Preview, Development (all 3)

### Step 6: Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. You'll get a URL like: `https://casino-party-xyz.vercel.app`

---

## 🧪 Test Your Deployment

Once deployed, test these features:

### 1. Public View
- Open the URL on your phone
- Should see "Vegas Nights" title
- Leaderboard should be empty initially

### 2. Banker Mode
- Triple-click the "Vegas Nights" title
- OR type "BANKER" on keyboard
- Should see the Banker Control Panel

### 3. Register a Test Player
- In banker mode, enter a name (e.g., "Test Player")
- Click "Register ($500)"
- Player should appear on leaderboard with $500

### 4. Test Transactions
- Select the player
- Try a withdrawal (e.g., $100)
- Try a deposit (e.g., $50)
- Check that balance updates correctly

### 5. Test Persistence
- Refresh the page
- Data should still be there
- Open URL on a different device - data should sync

---

## 📱 Share With Guests

Once deployed, share the Vercel URL with your party guests:

```
Your Vegas Nights Casino is live at:
https://casino-party-[your-id].vercel.app

🎰 Track your winnings on the leaderboard!
💰 May the odds be ever in your favor!
```

Guests can:
- View the leaderboard in real-time
- See who's winning
- Check their own balance

Only YOU (the banker) can:
- Register new players
- Process withdrawals/deposits
- Access the banker panel

---

## 🔄 Future Updates

Any time you make changes to the code:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically:
- Detect the push
- Rebuild the app
- Deploy the new version
- Keep the same URL

---

## 🎯 Party Day Checklist

□ Test the deployed app on your phone
□ Bookmark the URL
□ Test banker mode access (triple-click)
□ Register yourself as a test player
□ Delete test data before party starts
□ Share URL with guests
□ Optional: Cast to TV for big screen display
□ Have cash ready for player withdrawals
□ Enjoy the party! 🎉

---

## 🔒 Security Note

Your JSONBin API key is stored securely in Vercel's environment variables and is NOT exposed in the client-side code or GitHub repository.

However, the bin itself is accessible, so this is suitable for a fun party app but not for production use with sensitive data.

---

## ❓ Troubleshooting

**Build fails on Vercel?**
- Check that environment variables are exactly as shown above
- Make sure variable names are spelled correctly (case-sensitive)
- Verify both Production AND Preview are selected

**Data not loading?**
- Check Vercel deployment logs for errors
- Verify JSONBin credentials are correct
- Test the bin URL directly: `https://api.jsonbin.io/v3/b/690cf90b43b1c97be99d5d4d/latest`

**Banker mode not working?**
- Try typing "BANKER" in all caps
- Try triple-clicking more deliberately
- Clear browser cache and reload

**Need to reset all data?**
- Go to jsonbin.io
- Open your "casino-bin"
- Replace content with: `{"players": [], "transactions": []}`
- Save

---

## 🎊 You're All Set!

Your Vegas Nights Casino Banking App is ready for deployment!

Just follow the steps above to deploy to Vercel, and you'll have a live app for your party.

Good luck and have a great party! 🎰🎲✨

