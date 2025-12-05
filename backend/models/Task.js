import mongoose from 'mongoose';


const taskSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
title: { type: String, required: true, trim: true },
description: { type: String, default: '' },
completed: { type: Boolean, default: false, index: true },
priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
dueDate: { type: Date, default: null, index: true },
createdAt: { type: Date, default: Date.now, index: true },
updatedAt: { type: Date, default: Date.now }
});


// text index for search
taskSchema.index({ title: 'text', description: 'text' });
// compound index for user queries
taskSchema.index({ user: 1, createdAt: -1 });


const Task = mongoose.model('Task', taskSchema);
export default Task;