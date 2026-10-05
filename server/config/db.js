const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/interactive_python_platform';
  try {
    await mongoose.connect(uri);
    console.log(`[DB] MongoDB підключено: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('[DB] Помилка підключення до MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
