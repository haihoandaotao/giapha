const express = require('express');
const router = express.Router();
const {
  getAllFamilies,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  getFamilyStatistics
} = require('../controllers/familyController');

// Public routes
router.get('/', getAllFamilies);
router.get('/:id', getFamily);
router.get('/:id/statistics', getFamilyStatistics);

// Protected routes
router.post('/', createFamily);
router.put('/:id', updateFamily);
router.delete('/:id', deleteFamily);

module.exports = router;
