<template>
  <div class="leaderboard">
    <div class="leaderboard-header">
      <h2>🎰 Vegas Nights Leaderboard 🎰</h2>
      <p class="subtitle">High Rollers of the Night</p>
    </div>
    
    <div v-if="players.length === 0" class="empty-state">
      <p>No players yet! Visit the banker to get started.</p>
    </div>
    
    <div v-else class="leaderboard-list">
      <div 
        v-for="(player, index) in sortedPlayers" 
        :key="player.id"
        class="player-card"
        :class="{ 'top-player': index === 0 }"
      >
        <div class="rank">
          <span v-if="index === 0" class="trophy">👑</span>
          <span v-else-if="index === 1" class="trophy">🥈</span>
          <span v-else-if="index === 2" class="trophy">🥉</span>
          <span v-else class="rank-number">#{{ index + 1 }}</span>
        </div>
        <div class="player-info">
          <div class="player-name">{{ player.name }}</div>
        </div>
        <div class="player-balance">
          ${{ player.balance.toLocaleString() }}
        </div>
      </div>
    </div>
    
    <div class="last-updated">
      Last updated: {{ lastUpdated }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  props: {
    players: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      lastUpdated: this.getFormattedTime()
    }
  },
  computed: {
    sortedPlayers() {
      return [...this.players].sort((a, b) => b.balance - a.balance);
    }
  },
  methods: {
    getFormattedTime() {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
    },
    updateTime() {
      this.lastUpdated = this.getFormattedTime();
    }
  },
  watch: {
    players: {
      handler() {
        this.updateTime();
      },
      deep: true
    }
  },
  mounted() {
    // Update time every second
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>
.leaderboard {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.leaderboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.leaderboard-header h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #D4AF37;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.subtitle {
  color: #FFD700;
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  font-style: italic;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #D4AF37;
  font-size: 1.2rem;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.player-card {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #D4AF37;
  border-radius: 15px;
  padding: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.player-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
}

.player-card.top-player {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(255, 215, 0, 0.1));
  border-color: #FFD700;
  border-width: 3px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
}

.rank {
  min-width: 60px;
  text-align: center;
}

.trophy {
  font-size: 2rem;
}

.rank-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #D4AF37;
}

.player-info {
  flex: 1;
  margin: 0 20px;
}

.player-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.player-balance {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4CAF50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.last-updated {
  text-align: center;
  margin-top: 30px;
  color: rgba(212, 175, 55, 0.7);
  font-size: 0.9rem;
}

/* Mobile responsive */
@media (max-width: 600px) {
  .leaderboard {
    padding: 10px;
  }
  
  .leaderboard-header h2 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .player-card {
    padding: 15px;
  }
  
  .rank {
    min-width: 40px;
  }
  
  .trophy {
    font-size: 1.5rem;
  }
  
  .rank-number {
    font-size: 1.2rem;
  }
  
  .player-name {
    font-size: 1.2rem;
  }
  
  .player-balance {
    font-size: 1.4rem;
  }
  
  .player-info {
    margin: 0 10px;
  }
}
</style>
