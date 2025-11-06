# ⚠️ JSONBin API Issue - Quick Fix

## The Problem
Your JSONBin API credentials aren't working. Error: "X-Master-Key is invalid or the bin doesn't belong to your account"

## Quick Fix Steps

### Option 1: Verify Your Credentials (5 minutes)

1. **Go to JSONBin.io**
   - Open [https://jsonbin.io](https://jsonbin.io)
   - Log in to your account

2. **Check Your API Key**
   - Click your profile icon (top right)
   - Go to "API Keys"
   - Find your **X-Master-Key** (should start with `$2a$10$...`)
   - Make sure it's the same as what you gave me

3. **Check Your Bin ID**
   - Go to your bins list
   - Find the "casino-bin" 
   - Click on it
   - Look at the URL: `https://jsonbin.io/app/bins/[BIN_ID]`
   - Copy the BIN_ID from the URL

4. **Update the .env file**
   Create or edit `/Users/pelicarno/Olarm/casino-party/.env`:
   ```env
   VITE_JSONBIN_API_KEY=your_actual_master_key_here
   VITE_BIN_ID=your_actual_bin_id_here
   ```

5. **Restart the dev server**
   ```bash
   # Stop current server (Ctrl+C)
   cd /Users/pelicarno/Olarm/casino-party
   npm run dev
   ```

---

### Option 2: Create a New Bin (Recommended - 3 minutes)

1. **Go to JSONBin.io**
   - [https://jsonbin.io](https://jsonbin.io)
   - Log in

2. **Create New Bin**
   - Click "Create Bin" button
   - Name it: `casino-party`
   - Paste this initial data:
   ```json
   {
     "players": [],
     "transactions": []
   }
   ```
   - Click "Create"

3. **Get Your Credentials**
   
   **BIN ID:**
   - After creating, look at the URL
   - Copy the ID from: `https://jsonbin.io/app/bins/[COPY_THIS_PART]`
   
   **API KEY:**
   - Click your profile icon
   - Go to "API Keys" 
   - Copy the **X-Master-Key**

4. **Create the .env file manually**
   
   Open a text editor and create this file:
   `/Users/pelicarno/Olarm/casino-party/.env`
   
   With this content (replace with YOUR values):
   ```env
   VITE_JSONBIN_API_KEY=$2a$10$YourActualKeyHere
   VITE_BIN_ID=YourActualBinIdHere
   ```

5. **Restart**
   ```bash
   cd /Users/pelicarno/Olarm/casino-party
   npm run dev
   ```

---

## Test It's Working

Once you've updated the credentials:

1. Open http://localhost:5173
2. Type "BANKER" to enter banker mode
3. Register a test player
4. If it works - you'll see the player appear!
5. If not - check browser console (F12) for errors

---

## Common Issues

**"undefined" in API calls?**
- The .env file isn't being read
- Make sure file is named exactly `.env` (with the dot)
- Make sure it's in `/Users/pelicarno/Olarm/casino-party/` directory
- Restart the dev server after creating/editing

**CORS errors?**
- This shouldn't happen with JSONBin, but if it does, the bin might be private
- Make sure bin visibility is set correctly in JSONBin dashboard

**Still not working?**
- Double-check you're logged into the right JSONBin account
- The bin must belong to the account that generated the API key
- Try creating a completely new bin with a fresh API key

---

## Need Help?

Tell me what you see in the browser console (F12 key) and I can help debug further!

