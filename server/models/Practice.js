const mongoose = require('mongoose');

const practiceTaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    starterCode: { type: String, default: '' },
    solutionCode: { type: String, required: true },
    expectedOutput: { type: String, default: '' },
    hint: { type: String, default: '' },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const practiceSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    intro: { type: String, default: 'Спробуй виконати завдання самостійно, а потім звір із розв\'язком.' },
    tasks: { type: [practiceTaskSchema], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Practice', practiceSchema);
