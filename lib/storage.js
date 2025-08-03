import fs from 'fs';
import path from 'path';

// File-based storage for persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CELEBRATIONS_FILE = path.join(DATA_DIR, 'celebrations.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions to read/write JSON files
const readJsonFile = (filePath, defaultValue = []) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
};

const writeJsonFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
  }
};

export const UserStorage = {
  findOne: (query) => {
    const users = readJsonFile(USERS_FILE);
    return users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  },

  create: (userData) => {
    const users = readJsonFile(USERS_FILE);
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeJsonFile(USERS_FILE, users);
    return newUser;
  }
};

export const CelebrationStorage = {
  find: (query) => {
    const celebrations = readJsonFile(CELEBRATIONS_FILE);
    if (!query) return celebrations;

    return celebrations.filter(celebration => {
      if (query.userEmail) return celebration.userEmail === query.userEmail;
      return true;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  findOne: (query) => {
    const celebrations = readJsonFile(CELEBRATIONS_FILE);
    return celebrations.find(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      if (query._id) return celebration._id === query._id;
      return false;
    });
  },

  create: (celebrationData) => {
    const celebrations = readJsonFile(CELEBRATIONS_FILE);
    const newCelebration = {
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...celebrationData,
      createdAt: new Date().toISOString()
    };
    celebrations.push(newCelebration);
    writeJsonFile(CELEBRATIONS_FILE, celebrations);
    return newCelebration;
  },

  findOneAndUpdate: (query, updateData) => {
    const celebrations = readJsonFile(CELEBRATIONS_FILE);
    const index = celebrations.findIndex(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      return false;
    });

    if (index === -1) return null;

    celebrations[index] = { ...celebrations[index], ...updateData };
    writeJsonFile(CELEBRATIONS_FILE, celebrations);
    return celebrations[index];
  },

  findOneAndDelete: (query) => {
    const celebrations = readJsonFile(CELEBRATIONS_FILE);
    const index = celebrations.findIndex(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      return false;
    });

    if (index === -1) return null;

    const deleted = celebrations[index];
    celebrations.splice(index, 1);
    writeJsonFile(CELEBRATIONS_FILE, celebrations);
    return deleted;
  }
};
