<template>
  <div id="app">
    <div class="vegas-background"></div>
    
    <!-- Money Rain - Full Screen -->
    <div v-if="!bankerMode" class="money-rain">
      <div class="money-emoji" v-for="n in 20" :key="n" :style="getMoneyStyle(n)">💰</div>
    </div>
    
    <div class="container">
      <!-- Title -->
      <div class="title">
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

    // Setup auto-refresh (every 10 seconds for better performance)
    onMounted(() => {
      loadData();
      
      // Auto-refresh when not in banker mode
      refreshInterval.value = setInterval(() => {
        if (!bankerMode.value && !loading.value) {
          loadData();
        }
      }, 10000);
      
      // Listen for keyboard input for secret code
      window.addEventListener('keypress', handleKeyPress);
    });

    onUnmounted(() => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value);
      }
      if (secretTimer.value) {
        clearTimeout(secretTimer.value);
      }
      window.removeEventListener('keypress', handleKeyPress);
    });

    const getMoneyStyle = (n) => {
      // Random positioning and animation delay for each emoji
      return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 4}s`,
        fontSize: `${2 + Math.random() * 1.5}rem`
      };
    };

    return {
      bankerMode,
      players,
      transactions,
      loading,
      exitBankerMode,
      handleRegister,
      handleWithdraw,
      handleDeposit,
      getMoneyStyle
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
  background-image: url('/img/invite.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
    linear-gradient(
      180deg,
      rgba(26, 14, 62, 0.85) 0%,
      rgba(45, 27, 78, 0.8) 20%,
      rgba(74, 44, 94, 0.75) 40%,
      rgba(255, 107, 53, 0.65) 70%,
      rgba(255, 160, 122, 0.6) 85%,
      rgba(255, 215, 0, 0.55) 100%
    );
  z-index: 1;
}

.vegas-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 0, 150, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
  animation: neonPulse 4s ease-in-out infinite;
  z-index: 2;
}

@keyframes neonPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

@keyframes neonGlow {
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(255, 215, 0, 0.8),
      0 0 20px rgba(255, 215, 0, 0.6),
      0 0 30px rgba(255, 215, 0, 0.4),
      0 0 40px rgba(255, 140, 0, 0.3);
  }
  50% {
    text-shadow: 
      0 0 20px rgba(255, 215, 0, 1),
      0 0 30px rgba(255, 215, 0, 0.8),
      0 0 40px rgba(255, 215, 0, 0.6),
      0 0 50px rgba(255, 140, 0, 0.5),
      0 0 60px rgba(255, 140, 0, 0.3);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 10;
}

.title {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  user-select: none;
}

.title h1 {
  font-size: 4rem;
  font-weight: bold;
  color: #FFD700;
  letter-spacing: 8px;
  margin-bottom: 10px;
  animation: neonGlow 2s ease-in-out infinite, float 3s ease-in-out infinite;
  text-transform: uppercase;
  font-family: 'Impact', 'Arial Black', sans-serif;
}


.tagline {
  font-size: 1.2rem;
  color: #00FFFF;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 400;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.8),
    0 0 20px rgba(0, 255, 255, 0.5);
  animation: neonFlicker 3s infinite;
}

@keyframes neonFlicker {
  0%, 100% {
    opacity: 1;
  }
  92%, 94%, 96% {
    opacity: 0.7;
  }
  93%, 95% {
    opacity: 1;
  }
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
