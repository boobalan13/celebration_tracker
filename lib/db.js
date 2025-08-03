import mongoose from 'mongoose';

const CelebrationSchema = new mongoose.Schema({
  title: String,
  date: Date,
  type: String,
  description: String,
  userEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Celebration || mongoose.model('Celebration', CelebrationSchema);
