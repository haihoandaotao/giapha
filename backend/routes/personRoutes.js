const express = require('express');
const router = express.Router();
const {
  getAllPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  addSpouse,
  getFamilyTree
} = require('../controllers/personController');

// Public routes
router.get('/', getAllPersons);
router.get('/family-tree/:familyId', getFamilyTree);
router.get('/:id', getPerson);

// Protected routes (sẽ thêm middleware auth sau)
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);
router.post('/:id/spouse', addSpouse);

module.exports = router;
