import { Request, Response } from 'express';
import fs from 'fs';
import { Task } from '../src/task';

const tasksFile = './db/tasks.json';
let tasks: Task[] = [];

const readTasksFromFile = (): void => {
  try {
    const data = fs.readFileSync(tasksFile, 'utf-8');
    tasks = JSON.parse(data);
  } catch (error) {
    console.error('Error reading tasks from file:', error);
    tasks = [];
  }
};

const saveTasksToFile = (): void => {
  fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      console.error('Error writing tasks to file:', err);
    }
  });
};

readTasksFromFile();

export const getAllTasks = (req: Request, res: Response): void => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const { title, desc, completed } = req.body as Task;
  const newTask: Task = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    desc,
    completed,
  };
  tasks.push(newTask);
  saveTasksToFile();
  res.status(201).json(newTask);
};

export const getTaskById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const taskId = parseInt(id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    res.status(404).send('Task not found');
  } else {
    res.json(task);
  }
};

export const updateTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const taskId = parseInt(id, 10);
  const { title, desc, completed } = req.body as Partial<Task>;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: title || tasks[taskIndex].title,
      desc: desc || tasks[taskIndex].desc,
      completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    };
    saveTasksToFile();
    res.json(tasks[taskIndex]);
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  const { id } = req.params;
  const taskId = parseInt(id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== taskId);
  if (initialLength === tasks.length) {
    res.status(404).send('Task not found');
  } else {
    saveTasksToFile();
    res.status(204).send("Task Deleted Successfully!!");
  }
};
