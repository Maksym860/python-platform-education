const express = require('express');
const router = express.Router();
const {
  getLessonById,
  getLessonTheory,
  getLessonPractice,
  getLessonTest,
  checkLessonTest
} = require('../controllers/lessonController');

router.get('/:id', getLessonById);
router.get('/:lessonId/theory', getLessonTheory);
router.get('/:lessonId/practice', getLessonPractice);
router.get('/:lessonId/tests', getLessonTest);
router.post('/:lessonId/tests/check', checkLessonTest);

module.exports = router;
