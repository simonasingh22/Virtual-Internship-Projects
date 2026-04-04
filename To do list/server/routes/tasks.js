const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, reorderTasks } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/reorder', reorderTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
