const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String, default: '' }
  },
  { _id: false }
);

const testSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    title: { type: String, default: 'Перевір себе' },
    questions: { type: [questionSchema], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Test', testSchema);
