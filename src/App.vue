<template>
  <div id="app">
    <div class="vegas-background"></div>
    
    <div class="container">
      <!-- Title - Triple click to enter banker mode -->
      <div class="title" @click="handleTitleClick">
        <h1>Vegas Nights</h1>
        <p class="tagline">Casino Banking System</p>
      </div>

      <!-- Main Content -->
      <div v-if="!bankerMode" class="main-view">
        <Leaderboard :players="players" />
      </div>

      <div v-else class="banker-view">
        <BankerPanel 
          :players="players"
          :transactions="transactions"
          @close="exitBankerMode"
          @register="handleRegister"
          @withdraw="handleWithdraw"
          @deposit="handleDeposit"
        />
      </div>

      <!-- Loading indicator -->
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Processing...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Leaderboard from './components/Leaderboard.vue';
import BankerPanel from './components/BankerPanel.vue';
import { getData, registerPlayer, withdrawMoney, depositMoney } from './api.js';

export default {
  name: 'App',
  components: {
    Leaderboard,
    BankerPanel
  },
  setup() {
    const bankerMode = ref(false);
    const players = ref([]);
    const transactions = ref([]);
    const loading = ref(false);
    const clickCount = ref(0);
    const clickTimer = ref(null);
    const refreshInterval = ref(null);
    const secretCode = ref('');
    const secretTimer = ref(null);

    // Load data from JSONBin
    const loadData = async () => {
      try {
        const data = await getData();
        players.value = data.players || [];
        transactions.value = data.transactions || [];
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    // Handle triple-click on title
    const handleTitleClick = () => {
      clickCount.value++;
      
      if (clickCount.value === 1) {
        clickTimer.value = setTimeout(() => {
          clickCount.value = 0;
        }, 500);
      } else if (clickCount.value === 3) {
        clearTimeout(clickTimer.value);
        clickCount.value = 0;
        toggleBankerMode();
      }
    };

    // Handle secret code typing
    const handleKeyPress = (event) => {
      secretCode.value += event.key.toUpperCase();
      
      // Reset secret code after 2 seconds of no typing
      clearTimeout(secretTimer.value);
      secretTimer.value = setTimeout(() => {
        secretCode.value = '';
      }, 2000);
      
      // Check if secret code matches
      if (secretCode.value.includes('BANKER')) {
        secretCode.value = '';
        if (!bankerMode.value) {
          toggleBankerMode();
        }
      }
      
      // Keep only last 10 characters
      if (secretCode.value.length > 10) {
        secretCode.value = secretCode.value.slice(-10);
      }
    };

    // Toggle banker mode
    const toggleBankerMode = () => {
      bankerMode.value = !bankerMode.value;
      
      if (bankerMode.value) {
        // Show a subtle indication
        console.log('🎰 Banker mode activated');
      }
    };

    // Exit banker mode
    const exitBankerMode = () => {
      bankerMode.value = false;
    };

    // Register new player
    const handleRegister = async (name) => {
      loading.value = true;
      try {
        await registerPlayer(name);
        await loadData();
      } catch (error) {
        throw error;
      } finally {
        loading.value = false;
      }
    };

    // Withdraw money
    const handleWithdraw = async (playerId, amount) => {
      loading.value = true;
      try {
        await withdrawMoney(playerId, amount);
        await loadData();
      } catch (error) {
        throw error;
      } finally {
        loading.value = false;
      }
    };

    // Deposit money
    const handleDeposit = async (playerId, amount) => {
      loading.value = true;
      try {
        await depositMoney(playerId, amount);
        await loadData();
      } catch (error) {
        throw error;
      } finally {
        loading.value = false;
      }
    };

    // Setup auto-refresh (every 5 seconds)
    onMounted(() => {
      loadData();
      
      // Auto-refresh when not in banker mode
      refreshInterval.value = setInterval(() => {
        if (!bankerMode.value && !loading.value) {
          loadData();
        }
      }, 5000);
      
      // Listen for keyboard input for secret code
      window.addEventListener('keypress', handleKeyPress);
    });

    onUnmounted(() => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
      }
      if (clickTimer.value) {
        clearTimeout(clickTimer.value);
      }
      if (secretTimer.value) {
        clearTimeout(secretTimer.value);
      }
      window.removeEventListener('keypress', handleKeyPress);
    });

    return {
      bankerMode,
      players,
      transactions,
      loading,
      handleTitleClick,
      exitBankerMode,
      handleRegister,
      handleWithdraw,
      handleDeposit
    };
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
  color: white;
}

.vegas-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    #1a0e3e 0%,
    #2d1b4e 20%,
    #4a2c5e 40%,
    #ff6b35 70%,
    #ffa07a 85%,
    #ffd700 100%
  );
  z-index: -1;
}

.vegas-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 1;
}

.title {
  text-align: center;
  margin-bottom: 40px;
  cursor: pointer;
  user-select: none;
  padding: 20px;
  transition: transform 0.2s;
}

.title:active {
  transform: scale(0.98);
}

.title h1 {
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(135deg, #FFD700, #FFA500, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 4px;
  margin-bottom: 10px;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.tagline {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 300;
}

.main-view,
.banker-view {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(212, 175, 55, 0.3);
  border-top-color: #D4AF37;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-overlay p {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #D4AF37;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  .title {
    margin-bottom: 20px;
  }
  
  .title h1 {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
  
  .tagline {
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
}

@media (max-width: 480px) {
  .title h1 {
    font-size: 2rem;
  }
  
  .tagline {
    font-size: 0.8rem;
  }
}
</style>
