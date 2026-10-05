const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

exports.getModules = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.courseId) filter.courseId = req.query.courseId;
    const modules = await Module.find(filter).sort({ order: 1 });

    const modulesWithCounts = await Promise.all(
      modules.map(async (m) => {
        const lessonsCount = await Lesson.countDocuments({ moduleId: m._id });
        return { ...m.toObject(), lessonsCount };
      })
    );

    res.json(modulesWithCounts);
  } catch (err) {
    next(err);
  }
};

exports.getModuleById = async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) return res.status(404).json({ message: 'Модуль не знайдено' });

    const lessons = await Lesson.find({ moduleId: module._id }).sort({ order: 1 });
    res.json({ ...module.toObject(), lessons });
  } catch (err) {
    next(err);
  }
};

exports.getModuleLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({ moduleId: req.params.moduleId }).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    next(err);
  }
};
