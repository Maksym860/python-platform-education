const Course = require('../models/Course');
const Module = require('../models/Module');

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().sort({ createdAt: 1 });
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Курс не знайдено' });

    const modules = await Module.find({ courseId: course._id }).sort({ order: 1 });
    res.json({ ...course.toObject(), modules });
  } catch (err) {
    next(err);
  }
};
