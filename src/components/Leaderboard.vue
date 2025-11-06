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
    // Update time every 5 seconds (better performance)
    this.timer = setInterval(this.updateTime, 5000);
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
  position: relative;
}

.leaderboard-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.leaderboard-header h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #FFD700;
  text-shadow: 
    0 0 10px rgba(255, 215, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.6),
    0 0 30px rgba(255, 140, 0, 0.4),
    2px 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 3px;
  animation: titlePulse 3s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.subtitle {
  color: #FF00FF;
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  font-style: italic;
  text-shadow: 
    0 0 10px rgba(255, 0, 255, 0.8),
    0 0 20px rgba(255, 0, 255, 0.4);
  animation: subtitleGlow 2s ease-in-out infinite alternate;
}

@keyframes subtitleGlow {
  from {
    text-shadow: 
      0 0 10px rgba(255, 0, 255, 0.8),
      0 0 20px rgba(255, 0, 255, 0.4);
  }
  to {
    text-shadow: 
      0 0 15px rgba(255, 0, 255, 1),
      0 0 30px rgba(255, 0, 255, 0.6),
      0 0 40px rgba(255, 0, 255, 0.3);
  }
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
  position: relative;
  z-index: 1;
}

.player-card {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid #D4AF37;
  border-radius: 15px;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.player-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 8px 25px rgba(212, 175, 55, 0.4),
    0 0 30px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: #FFD700;
}

.player-card.top-player {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(255, 215, 0, 0.2));
  border-color: #FFD700;
  border-width: 3px;
  box-shadow: 
    0 6px 20px rgba(255, 215, 0, 0.5),
    0 0 40px rgba(255, 215, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: topPlayerGlow 2s ease-in-out infinite;
}

@keyframes topPlayerGlow {
  0%, 100% {
    box-shadow: 
      0 6px 20px rgba(255, 215, 0, 0.5),
      0 0 40px rgba(255, 215, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 8px 30px rgba(255, 215, 0, 0.7),
      0 0 60px rgba(255, 215, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
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
  position: relative;
  z-index: 1;
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
