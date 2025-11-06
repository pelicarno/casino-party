<template>
  <div class="banker-panel">
    <div class="banker-header">
      <h2>🎲 Banker Control Panel 🎲</h2>
      <button @click="$emit('close')" class="close-btn">Exit Banker Mode</button>
    </div>

    <div class="banker-content">
      <!-- Register New Player -->
      <div class="card">
        <h3>Register New Player</h3>
        <form @submit.prevent="handleRegister">
          <input 
            v-model="registerName" 
            type="text" 
            placeholder="Player Name" 
            required
            class="input-field"
          />
          <button type="submit" class="btn btn-primary">Register ($500)</button>
        </form>
        <p v-if="registerError" class="error">{{ registerError }}</p>
        <p v-if="registerSuccess" class="success">{{ registerSuccess }}</p>
      </div>

      <!-- Withdraw Money -->
      <div class="card">
        <h3>Withdraw Money</h3>
        <form @submit.prevent="handleWithdraw">
          <div class="player-search-container">
            <input 
              v-model="withdrawSearch" 
              type="text" 
              placeholder="Search and select player..." 
              class="input-field search-field"
              @focus="withdrawShowList = true"
              @blur="hideWithdrawList"
            />
            <div v-if="withdrawShowList && filteredWithdrawPlayers.length > 0" class="player-list">
              <div 
                v-for="player in filteredWithdrawPlayers" 
                :key="player.id"
                class="player-list-item"
                @mousedown="selectWithdrawPlayer(player)"
              >
                <span class="player-list-name">{{ player.name }}</span>
                <span class="player-list-balance">${{ player.balance.toLocaleString() }}</span>
              </div>
            </div>
            <div v-if="selectedWithdrawPlayer" class="selected-player">
              ✓ {{ selectedWithdrawPlayer.name }} - ${{ selectedWithdrawPlayer.balance.toLocaleString() }}
            </div>
          </div>
          <input 
            v-model.number="withdrawAmount" 
            type="number" 
            placeholder="Amount" 
            min="1"
            required
            class="input-field"
          />
          <button type="submit" class="btn btn-warning" :disabled="!selectedWithdrawPlayer">Withdraw</button>
        </form>
        <p v-if="withdrawError" class="error">{{ withdrawError }}</p>
        <p v-if="withdrawSuccess" class="success">{{ withdrawSuccess }}</p>
      </div>

      <!-- Deposit Money -->
      <div class="card">
        <h3>Deposit Money</h3>
        <form @submit.prevent="handleDeposit">
          <div class="player-search-container">
            <input 
              v-model="depositSearch" 
              type="text" 
              placeholder="Search and select player..." 
              class="input-field search-field"
              @focus="depositShowList = true"
              @blur="hideDepositList"
            />
            <div v-if="depositShowList && filteredDepositPlayers.length > 0" class="player-list">
              <div 
                v-for="player in filteredDepositPlayers" 
                :key="player.id"
                class="player-list-item"
                @mousedown="selectDepositPlayer(player)"
              >
                <span class="player-list-name">{{ player.name }}</span>
                <span class="player-list-balance">${{ player.balance.toLocaleString() }}</span>
              </div>
            </div>
            <div v-if="selectedDepositPlayer" class="selected-player">
              ✓ {{ selectedDepositPlayer.name }} - ${{ selectedDepositPlayer.balance.toLocaleString() }}
            </div>
          </div>
          <input 
            v-model.number="depositAmount" 
            type="number" 
            placeholder="Amount" 
            min="1"
            required
            class="input-field"
          />
          <button type="submit" class="btn btn-success" :disabled="!selectedDepositPlayer">Deposit</button>
        </form>
        <p v-if="depositError" class="error">{{ depositError }}</p>
        <p v-if="depositSuccess" class="success">{{ depositSuccess }}</p>
      </div>

      <!-- Transaction History -->
      <div class="card transaction-history">
        <h3>Recent Transactions</h3>
        <div v-if="transactions.length === 0" class="empty">
          No transactions yet
        </div>
        <div v-else class="transaction-list">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="transaction-item"
          >
            <span class="transaction-type" :class="transaction.type">
              {{ formatType(transaction.type) }}
            </span>
            <span class="transaction-player">
              {{ getPlayerName(transaction.playerId) }}
            </span>
            <span class="transaction-amount" :class="transaction.type">
              {{ transaction.type === 'withdraw' ? '-' : '+' }}${{ transaction.amount }}
            </span>
            <span class="transaction-time">
              {{ formatTime(transaction.timestamp) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BankerPanel',
  props: {
    players: {
      type: Array,
      default: () => []
    },
    transactions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // Register form
      registerName: '',
      registerError: '',
      registerSuccess: '',
      
      // Withdraw form
      withdrawAmount: '',
      withdrawError: '',
      withdrawSuccess: '',
      withdrawSearch: '',
      withdrawShowList: false,
      selectedWithdrawPlayer: null,
      
      // Deposit form
      depositAmount: '',
      depositError: '',
      depositSuccess: '',
      depositSearch: '',
      depositShowList: false,
      selectedDepositPlayer: null
    }
  },
  computed: {
    recentTransactions() {
      return [...this.transactions]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    },
    filteredWithdrawPlayers() {
      if (!this.withdrawSearch) return this.players;
      const search = this.withdrawSearch.toLowerCase();
      return this.players.filter(player => 
        player.name.toLowerCase().includes(search)
      );
    },
    filteredDepositPlayers() {
      if (!this.depositSearch) return this.players;
      const search = this.depositSearch.toLowerCase();
      return this.players.filter(player => 
        player.name.toLowerCase().includes(search)
      );
    }
  },
  methods: {
    async handleRegister() {
      this.registerError = '';
      this.registerSuccess = '';
      
      try {
        await this.$emit('register', this.registerName);
        this.registerSuccess = `${this.registerName} registered successfully with $500!`;
        this.registerName = '';
        
        setTimeout(() => {
          this.registerSuccess = '';
        }, 3000);
      } catch (error) {
        this.registerError = error.message || 'Failed to register player';
      }
    },
    
    selectWithdrawPlayer(player) {
      this.selectedWithdrawPlayer = player;
      this.withdrawSearch = player.name;
      this.withdrawShowList = false;
    },
    
    hideWithdrawList() {
      setTimeout(() => {
        this.withdrawShowList = false;
      }, 200);
    },
    
    async handleWithdraw() {
      this.withdrawError = '';
      this.withdrawSuccess = '';
      
      if (!this.selectedWithdrawPlayer) {
        this.withdrawError = 'Please select a player';
        return;
      }
      
      try {
        await this.$emit('withdraw', this.selectedWithdrawPlayer.id, this.withdrawAmount);
        this.withdrawSuccess = `${this.selectedWithdrawPlayer.name} withdrew $${this.withdrawAmount}`;
        this.selectedWithdrawPlayer = null;
        this.withdrawSearch = '';
        this.withdrawAmount = '';
        
        setTimeout(() => {
          this.withdrawSuccess = '';
        }, 3000);
      } catch (error) {
        this.withdrawError = error.message || 'Failed to process withdrawal';
      }
    },
    
    selectDepositPlayer(player) {
      this.selectedDepositPlayer = player;
      this.depositSearch = player.name;
      this.depositShowList = false;
    },
    
    hideDepositList() {
      setTimeout(() => {
        this.depositShowList = false;
      }, 200);
    },
    
    async handleDeposit() {
      this.depositError = '';
      this.depositSuccess = '';
      
      if (!this.selectedDepositPlayer) {
        this.depositError = 'Please select a player';
        return;
      }
      
      try {
        await this.$emit('deposit', this.selectedDepositPlayer.id, this.depositAmount);
        this.depositSuccess = `${this.selectedDepositPlayer.name} deposited $${this.depositAmount}`;
        this.selectedDepositPlayer = null;
        this.depositSearch = '';
        this.depositAmount = '';
        
        setTimeout(() => {
          this.depositSuccess = '';
        }, 3000);
      } catch (error) {
        this.depositError = error.message || 'Failed to process deposit';
      }
    },
    
    getPlayerName(playerId) {
      const player = this.players.find(p => p.id === playerId);
      return player ? player.name : 'Unknown';
    },
    
    formatType(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
    
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
.banker-panel {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.banker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.banker-header h2 {
  font-size: 2rem;
  margin: 0;
  color: #FF00FF;
  text-shadow: 
    0 0 10px rgba(255, 0, 255, 0.8),
    0 0 20px rgba(255, 0, 255, 0.6),
    0 0 30px rgba(255, 0, 255, 0.4),
    2px 2px 4px rgba(0, 0, 0, 0.8);
  animation: bankerPulse 2s ease-in-out infinite;
}

@keyframes bankerPulse {
  0%, 100% {
    text-shadow: 
      0 0 10px rgba(255, 0, 255, 0.8),
      0 0 20px rgba(255, 0, 255, 0.6),
      0 0 30px rgba(255, 0, 255, 0.4),
      2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  50% {
    text-shadow: 
      0 0 15px rgba(255, 0, 255, 1),
      0 0 30px rgba(255, 0, 255, 0.8),
      0 0 45px rgba(255, 0, 255, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.8);
  }
}

.close-btn {
  padding: 10px 20px;
  background: rgba(244, 67, 54, 0.8);
  color: white;
  border: 2px solid #f44336;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #f44336;
  transform: scale(1.05);
}

.banker-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #D4AF37;
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(212, 175, 55, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 25px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.card h3 {
  color: #00FFFF;
  margin: 0 0 20px 0;
  font-size: 1.3rem;
  text-align: center;
  text-shadow: 
    0 0 10px rgba(0, 255, 255, 0.6),
    0 0 20px rgba(0, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(212, 175, 55, 0.5);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #D4AF37;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-field {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(100, 200, 255, 0.5);
}

.search-field:focus {
  border-color: #64c8ff;
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
}

.player-search-container {
  position: relative;
  margin-bottom: 15px;
}

.player-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.95);
  border: 2px solid #64c8ff;
  border-radius: 8px;
  margin-top: 5px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.player-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid rgba(100, 200, 255, 0.2);
}

.player-list-item:last-child {
  border-bottom: none;
}

.player-list-item:hover {
  background: rgba(100, 200, 255, 0.2);
  transform: translateX(5px);
}

.player-list-name {
  color: white;
  font-weight: 500;
  flex: 1;
}

.player-list-balance {
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.1rem;
}

.selected-player {
  padding: 10px 15px;
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid #4CAF50;
  border-radius: 8px;
  color: #4CAF50;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-success {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.error {
  color: #ff6b6b;
  margin: 10px 0 0 0;
  text-align: center;
  font-weight: bold;
}

.success {
  color: #4CAF50;
  margin: 10px 0 0 0;
  text-align: center;
  font-weight: bold;
}

.transaction-history {
  grid-column: 1 / -1;
}

.transaction-list {
  max-height: 300px;
  overflow-y: auto;
}

.transaction-item {
  display: grid;
  grid-template-columns: 100px 1fr 100px 80px;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.transaction-type {
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.transaction-type.register {
  background: rgba(103, 126, 234, 0.3);
  color: #a5b4fc;
}

.transaction-type.withdraw {
  background: rgba(245, 87, 108, 0.3);
  color: #fca5a5;
}

.transaction-type.deposit {
  background: rgba(0, 242, 254, 0.3);
  color: #67e8f9;
}

.transaction-player {
  color: white;
  font-weight: 500;
}

.transaction-amount {
  font-weight: bold;
  text-align: right;
}

.transaction-amount.withdraw {
  color: #ff6b6b;
}

.transaction-amount.deposit {
  color: #4CAF50;
}

.transaction-time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: right;
}

.empty {
  text-align: center;
  color: rgba(212, 175, 55, 0.5);
  padding: 20px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .banker-panel {
    padding: 10px;
  }
  
  .banker-header {
    flex-direction: column;
    text-align: center;
  }
  
  .banker-header h2 {
    font-size: 1.5rem;
  }
  
  .banker-content {
    grid-template-columns: 1fr;
  }
  
  .card {
    padding: 15px;
  }
  
  .transaction-item {
    grid-template-columns: 80px 1fr 80px;
    gap: 8px;
    font-size: 0.9rem;
  }
  
  .transaction-time {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 0.8rem;
  }
}
</style>
