# 🎰 Setup Guide for Vegas Nights Casino Banking App

## Step-by-Step Setup Instructions

### 1. JSONBin.io Setup (5 minutes)

JSONBin.io is a free cloud service for storing JSON data. Here's how to set it up:

#### Create Your Account
1. Go to [https://jsonbin.io](https://jsonbin.io)
2. Click "Sign Up" in the top right
3. Sign up with your email or GitHub account
4. Verify your email if required
5. Log in to your dashboard

#### Create Your Data Bin
1. Once logged in, click **"Create Bin"** button
2. In the JSON editor, paste this initial structure:
   ```json
   {
     "players": [],
     "transactions": []
   }
   ```
3. Give your bin a name (e.g., "Vegas Nights Casino Party")
4. Click **"Create"**
5. **Important:** Make sure the bin is set to **"Public"** or **"Private with Master Key"**

#### Get Your Credentials
1. **Get Bin ID:**
   - After creating the bin, look at the URL
   - It will be like: `https://jsonbin.io/bin/65abc123def456789`
   - Copy the ID after `/bin/` (e.g., `65abc123def456789`)

2. **Get API Key:**
   - Click on your profile icon (top right)
   - Go to **"API Keys"** or **"Account Settings"**
   - Copy your **"Master Key"** or **"X-Master-Key"**
   - It looks like: `$2a$10$abcdefghijklmnopqrstuvwxyz1234567890...`

### 2. Configure Your App

Create a `.env` file in the root of the `casino-party` folder:

```bash
# In the casino-party directory, create .env file
touch .env
```

Add your credentials to the `.env` file:

```env
VITE_JSONBIN_API_KEY=$2a$10$your_actual_api_key_here
VITE_BIN_ID=65abc123def456789
```

**Important Notes:**
- Replace the values with YOUR actual API key and Bin ID
- Do NOT share these credentials publicly
- Do NOT commit the `.env` file to Git (it's already in `.gitignore`)

### 3. Test Locally

```bash
# Make sure you're in the casino-party directory
cd /Users/pelicarno/Olarm/casino-party

# Install dependencies (if not done already)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and test:
1. Triple-click "Vegas Nights" title to enter banker mode
2. Register a test player
3. Check that the player appears on the leaderboard
4. Try a withdrawal and deposit
5. Refresh the page - data should persist

### 4. Deploy to Vercel

#### First Time Setup

1. **Push to GitHub** (if not done already):
   ```bash
   git add .
   git commit -m "Initial commit - Vegas Nights Casino App"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click **"New Project"**
   - Select your `casino-party` repository
   - Click **"Import"**

3. **Configure Environment Variables:**
   - Before clicking "Deploy", go to **"Environment Variables"** section
   - Add two variables:
     
     **Variable 1:**
     - Name: `VITE_JSONBIN_API_KEY`
     - Value: Your JSONBin API key (paste it)
     - Environment: Production, Preview, Development (select all)
     
     **Variable 2:**
     - Name: `VITE_BIN_ID`
     - Value: Your Bin ID
     - Environment: Production, Preview, Development (select all)

4. **Deploy:**
   - Click **"Deploy"**
   - Wait 1-2 minutes for the build to complete
   - You'll get a public URL like: `https://casino-party-abc123.vercel.app`

#### Future Updates

Every time you push to GitHub, Vercel will automatically rebuild and deploy your app!

```bash
# Make changes to your code
git add .
git commit -m "Update something"
git push origin main
# Vercel automatically deploys!
```

### 5. Party Time Setup

On the day of the party:

1. **Open the app** on the banker's device
2. **Test the banker mode** (triple-click title or type "BANKER")
3. **Share the URL** with guests so they can see the leaderboard
4. **Display on a big screen** (optional but fun!)
   - Cast to a TV
   - Connect laptop to projector
   - Use iPad/tablet in landscape mode

### 6. Backup Your Data

To download a backup of all player data:

1. Go to [https://jsonbin.io](https://jsonbin.io)
2. Log in to your account
3. Find your "Vegas Nights" bin
4. Click to view it
5. Click the **"Download"** or **"Export"** button
6. Save the JSON file

You can restore this data later if needed!

## Troubleshooting

### Problem: "Failed to fetch data" error

**Solutions:**
- Check that your `.env` file exists and has the correct values
- Verify your JSONBin API key is correct
- Make sure your Bin ID is correct
- Check that your bin is not private (or has the right permissions)
- Try creating a new bin and updating your Bin ID

### Problem: Data not persisting

**Solutions:**
- Verify your JSONBin credentials are correct
- Check browser console for error messages
- Make sure you have internet connection
- Try refreshing the JSONBin.io dashboard to see if data is there

### Problem: Can't enter banker mode

**Solutions:**
- Try triple-clicking more deliberately (slower)
- Make sure you're clicking the main "Vegas Nights" title
- On desktop, try typing "BANKER" in all caps
- Check browser console for JavaScript errors

### Problem: Vercel deployment fails

**Solutions:**
- Make sure environment variables are set in Vercel dashboard
- Check that variable names match exactly (case-sensitive)
- Look at deployment logs for specific errors
- Try redeploying from Vercel dashboard

## Security Notes

⚠️ **Important:** This app has no authentication and uses a public data store. This is fine for a private party, but:

- Anyone with the URL can see the leaderboard
- Anyone who discovers banker mode can make changes
- Don't use for anything involving real money or sensitive data
- Consider this a "fun party app" not a secure banking system

## Free Tier Limits

### JSONBin.io Free Tier:
- 100,000 API calls per month
- 100 bins
- More than enough for a party!

### Vercel Free Tier:
- 100 GB bandwidth per month
- Unlimited personal projects
- Automatic SSL certificates
- More than enough for a party app!

## Need Help?

If you run into issues:
1. Check the browser console for errors (F12 key)
2. Verify all credentials are correct
3. Test with a fresh bin in JSONBin.io
4. Check that you're using Node.js v16 or higher

---

**Ready to party? 🎰 Let's go!**

