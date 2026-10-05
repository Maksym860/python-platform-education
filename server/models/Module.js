const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    icon: { type: String, default: '🐍' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Module', moduleSchema);
