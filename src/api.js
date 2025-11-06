// JSONBin.io API integration
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const BIN_ID = import.meta.env.VITE_BIN_ID;
const BASE_URL = 'https://api.jsonbin.io/v3';

// Initialize bin with default data structure
const defaultData = {
  players: [],
  transactions: []
};

// Get all data from JSONBin
export async function getData() {
  try {
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const result = await response.json();
    return result.record || defaultData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return defaultData;
  }
}

// Update data in JSONBin
export async function updateData(data) {
  try {
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Helper function to generate unique IDs
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Register a new player
export async function registerPlayer(name) {
  const data = await getData();
  
  // Check if player already exists
  const existingPlayer = data.players.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (existingPlayer) {
    throw new Error('Player already exists');
  }
  
  const newPlayer = {
    id: generateId(),
    name,
    balance: 500,
    registered: new Date().toISOString()
  };
  
  data.players.push(newPlayer);
  
  // Add initial transaction
  data.transactions.push({
    id: generateId(),
    playerId: newPlayer.id,
    type: 'register',
    amount: 500,
    timestamp: new Date().toISOString()
  });
  
  await updateData(data);
  return newPlayer;
}

// Process a withdrawal
export async function withdrawMoney(playerId, amount) {
  const data = await getData();
  const player = data.players.find(p => p.id === playerId);
  
  if (!player) {
    throw new Error('Player not found');
  }
  
  if (player.balance < amount) {
    throw new Error('Insufficient balance');
  }
  
  player.balance -= amount;
  
  data.transactions.push({
    id: generateId(),
    playerId,
    type: 'withdraw',
    amount,
    timestamp: new Date().toISOString()
  });
  
  await updateData(data);
  return player;
}

// Process a deposit
export async function depositMoney(playerId, amount) {
  const data = await getData();
  const player = data.players.find(p => p.id === playerId);
  
  if (!player) {
    throw new Error('Player not found');
  }
  
  player.balance += amount;
  
  data.transactions.push({
    id: generateId(),
    playerId,
    type: 'deposit',
    amount,
    timestamp: new Date().toISOString()
  });
  
  await updateData(data);
  return player;
}
