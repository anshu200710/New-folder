import Task from '../models/Task.js';


export const createTask = async (req, res) => {
try {
const { title, description, dueDate, priority } = req.body;
const task = await Task.create({
user: req.user.id,
title,
description,
dueDate: dueDate || null,
priority: priority || 'medium'
});
res.status(201).json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const getTasks = async (req, res) => {
try {
const { page = 1, limit = 50, q, completed } = req.query;
const filter = { user: req.user.id };
if (completed !== undefined) filter.completed = completed === 'true';
if (q) filter.$text = { $search: q };


const tasks = await Task.find(filter)
.sort({ createdAt: -1 })
.skip((page - 1) * limit)
.limit(Number(limit))
.lean();


res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const updateTask = async (req, res) => {
try {
const { id } = req.params;
const updates = { ...req.body, updatedAt: Date.now() };
const task = await Task.findOneAndUpdate({ _id: id, user: req.user.id }, updates, { new: true });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const deleteTask = async (req, res) => {
try {
const { id } = req.params;
const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ success: true });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};