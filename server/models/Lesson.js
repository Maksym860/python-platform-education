const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    order: { type: Number, required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    estimatedMinutes: { type: Number, default: 10 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
