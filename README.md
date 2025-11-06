# 🎰 Vegas Nights - Casino Banking App

A beautiful, Vegas-themed casino banking application for tracking player balances at your casino party. Features a public leaderboard and a secret banker control panel.

![Vegas Nights Theme](https://img.shields.io/badge/Theme-Vegas%20Nights-gold?style=for-the-badge)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?style=for-the-badge&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

- 🏆 **Public Leaderboard** - Real-time player rankings sorted by balance
- 🎲 **Banker Mode** - Secret control panel (triple-click title or type "BANKER")
- 💰 **Player Management** - Register players with $500 starting balance
- 💸 **Transactions** - Process withdrawals and deposits
- 📊 **Transaction History** - Track all money movements
- 📱 **Mobile Friendly** - Responsive design for phones and tablets
- 🎨 **Vegas Theme** - Beautiful sunset gradient with gold accents
- ☁️ **Cloud Storage** - Persistent data with JSONBin.io
- 🔄 **Auto-Refresh** - Leaderboard updates every 5 seconds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- JSONBin.io account (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd casino-party
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up JSONBin.io**
   - Go to [jsonbin.io](https://jsonbin.io)
   - Sign up for a free account
   - Create a new bin with this initial data:
     ```json
     {
       "players": [],
       "transactions": []
     }
     ```
   - Copy your API Key (from Account Settings)
   - Copy your Bin ID (from the bin URL)

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_JSONBIN_API_KEY=your_api_key_here
   VITE_BIN_ID=your_bin_id_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 How to Use

### For Guests (Leaderboard View)
- Open the app on any device
- View real-time player rankings
- See who's winning big!

### For the Banker (Secret Mode)
Access the banker control panel using either method:
- **Triple-click** the "Vegas Nights" title
- **Type** `BANKER` anywhere on the page

From the banker panel you can:
- **Register** new players ($500 starting balance)
- **Process withdrawals** when players go to the tables
- **Process deposits** when players return with winnings
- **View transaction history** of all activities

Click "Exit Banker Mode" to return to the leaderboard.

## 🌐 Deployment to Vercel

### One-Click Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel:
   - `VITE_JSONBIN_API_KEY` → your JSONBin API key
   - `VITE_BIN_ID` → your JSONBin Bin ID
6. Click "Deploy"

Vercel will automatically:
- Build your app
- Deploy to a public URL
- Auto-deploy on every push to your repository

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## 🎨 Customization

### Colors
Edit the gradient in `src/App.vue`:
```css
background: linear-gradient(
  180deg,
  #1a0e3e 0%,    /* Deep purple */
  #2d1b4e 20%,   /* Purple */
  #4a2c5e 40%,   /* Light purple */
  #ff6b35 70%,   /* Orange */
  #ffa07a 85%,   /* Light orange */
  #ffd700 100%   /* Gold */
);
```

### Starting Balance
Change in `src/api.js`:
```javascript
balance: 500,  // Change this value
```

## 📱 Mobile Screenshots

The app is fully responsive and works great on:
- 📱 Phones (iOS & Android)
- 📱 Tablets
- 💻 Desktop browsers

## 🛠 Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Styling:** Plain CSS with custom Vegas theme
- **Database:** JSONBin.io (cloud JSON storage)
- **Hosting:** Vercel (serverless deployment)

## 📝 Project Structure

```
casino-party/
├── src/
│   ├── components/
│   │   ├── Leaderboard.vue      # Player rankings display
│   │   └── BankerPanel.vue      # Banker control panel
│   ├── App.vue                  # Main app component
│   ├── api.js                   # JSONBin API integration
│   ├── main.js                  # Vue app initialization
│   └── style.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML entry point
├── vercel.json                  # Vercel configuration
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```

## 🎯 Features in Detail

### Banker Mode Easter Egg
Two ways to access:
1. **Triple-click** the main title (mobile-friendly)
2. **Type "BANKER"** on your keyboard (desktop-friendly)

### Auto-Refresh
- Leaderboard refreshes every 5 seconds when in public view
- Pauses when in banker mode to prevent interruptions
- Real-time updates across all devices viewing the app

### Transaction Tracking
All actions are logged:
- Player registrations
- Withdrawals (money taken to tables)
- Deposits (winnings returned)

## 🐛 Troubleshooting

**Data not loading?**
- Check that your `.env` file has the correct JSONBin credentials
- Verify your JSONBin API key is active
- Check browser console for errors

**Banker mode not working?**
- Try triple-clicking more deliberately
- Make sure you're typing "BANKER" in all caps
- Check that JavaScript is enabled

**App not deploying to Vercel?**
- Make sure environment variables are set in Vercel dashboard
- Check build logs for errors
- Verify `vercel.json` is in the root directory

## 📄 License

This project is created for private party use. Feel free to modify and customize for your own events!

## 🎉 Party Tips

- Test the banker mode before the party starts
- Have a backup of player data (download from JSONBin)
- Keep one device as the "banker station"
- Display the leaderboard on a TV or projector
- Update players on their rankings throughout the night!

---

Built with ❤️ for an epic casino party 🎰
