const mongoose = require('mongoose');

const codeExampleSchema = new mongoose.Schema(
  {
    caption: { type: String, default: '' },
    code: { type: String, required: true },
    output: { type: String, default: '' }
  },
  { _id: false }
);

const theorySchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    heading: { type: String, required: true },
    text: { type: String, required: true },
    codeExamples: { type: [codeExampleSchema], default: [] },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Theory', theorySchema);
