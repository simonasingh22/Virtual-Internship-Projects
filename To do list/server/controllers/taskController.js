const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({ title, description, priority, dueDate, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { filter, search } = req.query;
    const query = { user: req.user.id };
    if (filter === 'completed') query.status = 'completed';
    if (filter === 'pending') query.status = 'pending';
    if (search) query.title = { $regex: search, $options: 'i' };
    const tasks = await Task.find(query).sort({ order: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

exports.reorderTasks = async (req, res, next) => {
  try {
    const { orders } = req.body; // [{id, order}, ...]
    const ops = orders.map(o => ({ updateOne: { filter: { _id: o.id, user: req.user.id }, update: { order: o.order } } }));
    await Task.bulkWrite(ops);
    res.json({ message: 'Reordered' });
  } catch (err) {
    next(err);
  }
};
