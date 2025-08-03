import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CELEBRATIONS_FILE = path.join(DATA_DIR, 'celebrations.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

if (!fs.existsSync(CELEBRATIONS_FILE)) {
  fs.writeFileSync(CELEBRATIONS_FILE, JSON.stringify([]));
}

// User operations
export const UserDB = {
  findOne: (query) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    return users.find(user => {
      if (query.email) return user.email === query.email;
      if (query._id) return user._id === query._id;
      return false;
    });
  },

  create: (userData) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const newUser = {
      _id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return newUser;
  }
};

// Celebration operations
export const CelebrationDB = {
  find: (query) => {
    const celebrations = JSON.parse(fs.readFileSync(CELEBRATIONS_FILE, 'utf8'));
    if (!query) return celebrations;
    
    return celebrations.filter(celebration => {
      if (query.userEmail) return celebration.userEmail === query.userEmail;
      return true;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  findOne: (query) => {
    const celebrations = JSON.parse(fs.readFileSync(CELEBRATIONS_FILE, 'utf8'));
    return celebrations.find(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      if (query._id) return celebration._id === query._id;
      return false;
    });
  },

  create: (celebrationData) => {
    const celebrations = JSON.parse(fs.readFileSync(CELEBRATIONS_FILE, 'utf8'));
    const newCelebration = {
      _id: Date.now().toString(),
      ...celebrationData,
      createdAt: new Date().toISOString()
    };
    celebrations.push(newCelebration);
    fs.writeFileSync(CELEBRATIONS_FILE, JSON.stringify(celebrations, null, 2));
    return newCelebration;
  },

  findOneAndUpdate: (query, updateData) => {
    const celebrations = JSON.parse(fs.readFileSync(CELEBRATIONS_FILE, 'utf8'));
    const index = celebrations.findIndex(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      return false;
    });

    if (index === -1) return null;

    celebrations[index] = { ...celebrations[index], ...updateData };
    fs.writeFileSync(CELEBRATIONS_FILE, JSON.stringify(celebrations, null, 2));
    return celebrations[index];
  },

  findOneAndDelete: (query) => {
    const celebrations = JSON.parse(fs.readFileSync(CELEBRATIONS_FILE, 'utf8'));
    const index = celebrations.findIndex(celebration => {
      if (query._id && query.userEmail) {
        return celebration._id === query._id && celebration.userEmail === query.userEmail;
      }
      return false;
    });

    if (index === -1) return null;

    const deleted = celebrations[index];
    celebrations.splice(index, 1);
    fs.writeFileSync(CELEBRATIONS_FILE, JSON.stringify(celebrations, null, 2));
    return deleted;
  }
};
