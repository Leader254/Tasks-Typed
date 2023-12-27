import { Router } from 'express';
import { getAllTasks, getTaskById, createTask, deleteTask, updateTask } from "../controller/taskController";

const router = Router();

router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default router; 
