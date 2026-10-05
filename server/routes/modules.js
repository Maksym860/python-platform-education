const express = require('express');
const router = express.Router();
const {
  getModules,
  getModuleById,
  getModuleLessons
} = require('../controllers/moduleController');

router.get('/', getModules);
router.get('/:id', getModuleById);
router.get('/:moduleId/lessons', getModuleLessons);

module.exports = router;
