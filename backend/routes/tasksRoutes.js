import express from 'express';
import auth from '../middleware/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';


const router = express.Router();


router.use(auth);
router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);


export default router;