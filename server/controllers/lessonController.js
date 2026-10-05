const Lesson = require('../models/Lesson');
const Theory = require('../models/Theory');
const Practice = require('../models/Practice');
const Test = require('../models/Test');
const Module = require('../models/Module');

exports.getLessonById = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Урок не знайдено' });

    const module = await Module.findById(lesson.moduleId);
    const theory = await Theory.find({ lessonId: lesson._id }).sort({ order: 1 });
    const practice = await Practice.findOne({ lessonId: lesson._id });
    const test = await Test.findOne({ lessonId: lesson._id });

    res.json({
      ...lesson.toObject(),
      module: module ? { _id: module._id, title: module.title, slug: module.slug } : null,
      theory,
      practice: practice
        ? { intro: practice.intro, tasks: [...practice.tasks].sort((a, b) => a.order - b.order) }
        : null,
      hasTest: Boolean(test)
    });
  } catch (err) {
    next(err);
  }
};

exports.getLessonTheory = async (req, res, next) => {
  try {
    const theory = await Theory.find({ lessonId: req.params.lessonId }).sort({ order: 1 });
    res.json(theory);
  } catch (err) {
    next(err);
  }
};

exports.getLessonPractice = async (req, res, next) => {
  try {
    const practice = await Practice.findOne({ lessonId: req.params.lessonId });
    if (!practice) return res.status(404).json({ message: 'Практичних завдань для цього уроку ще немає' });

    res.json({
      intro: practice.intro,
      tasks: [...practice.tasks].sort((a, b) => a.order - b.order)
    });
  } catch (err) {
    next(err);
  }
};

exports.getLessonTest = async (req, res, next) => {
  try {
    const test = await Test.findOne({ lessonId: req.params.lessonId });
    if (!test) return res.status(404).json({ message: 'Тест для цього уроку не знайдено' });

    // Не показуємо правильні відповіді напряму на фронтенд перед проходженням
    const safeTest = {
      _id: test._id,
      title: test.title,
      lessonId: test.lessonId,
      questions: test.questions.map((q) => ({
        question: q.question,
        options: q.options
      }))
    };
    res.json(safeTest);
  } catch (err) {
    next(err);
  }
};

exports.checkLessonTest = async (req, res, next) => {
  try {
    const test = await Test.findOne({ lessonId: req.params.lessonId });
    if (!test) return res.status(404).json({ message: 'Тест для цього уроку не знайдено' });

    const answers = req.body.answers || [];
    let correctCount = 0;

    const results = test.questions.map((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswerIndex;
      if (isCorrect) correctCount += 1;
      return {
        question: q.question,
        yourAnswer: answers[idx] ?? null,
        correctAnswer: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation
      };
    });

    res.json({
      total: test.questions.length,
      correct: correctCount,
      scorePercent: Math.round((correctCount / test.questions.length) * 100),
      results
    });
  } catch (err) {
    next(err);
  }
};
