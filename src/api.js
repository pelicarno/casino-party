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
  // Debug: Check if env variables are loaded
  if (!API_KEY || !BIN_ID) {
    console.error('❌ JSONBin credentials missing!');
    console.error('API_KEY:', API_KEY ? '✓ Set' : '❌ Missing');
    console.error('BIN_ID:', BIN_ID ? '✓ Set' : '❌ Missing');
    console.error('Make sure .env file exists with VITE_JSONBIN_API_KEY and VITE_BIN_ID');
    return defaultData;
  }
  
  try {
    console.log('🔄 Fetching data from JSONBin...');
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ JSONBin API Error:', response.status, errorText);
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Data loaded successfully:', result.record);
    return result.record || defaultData;
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    return defaultData;
  }
}

// Update data in JSONBin
export async function updateData(data) {
  if (!API_KEY || !BIN_ID) {
    console.error('❌ Cannot update: JSONBin credentials missing!');
    throw new Error('JSONBin credentials not configured');
  }
  
  try {
    console.log('🔄 Updating JSONBin data...');
    const response = await fetch(`${BASE_URL}/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ JSONBin Update Error:', response.status, errorText);
      throw new Error(`Failed to update data: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Data updated successfully');
    return result;
  } catch (error) {
    console.error('❌ Error updating data:', error);
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
