import { Request, Response } from 'express';
import TaskService from '../services/tasks.service';
import { CustomRequest } from '../middleware/auth.middleware';

const TaskController = {
    getAllTasks: async (req: CustomRequest, res: Response) => {
	try {
	    const tasks = await TaskService.getAll();
	    res.json(tasks);
	} catch (error) {
	    const err = error as Error;
	    res.status(500).json({ error: err.message });
	}
    },
    assignTaskToUser: async (req: Request, res: Response): Promise<void> => {
	const { taskId, userId } = req.body;

	try {
	    const task = await TaskService.assignTaskToUser(taskId, userId);
	    if (task) {
		res.status(200).json(task);
	    } else {
		res.status(404).json({ message: 'Task or user not found' });
	    }
	} catch (error) {
	    const err = error as Error;
	    res.status(500).json({ error: err.message });
	}
    },

    getTasksByUserAndStatus:async (req: CustomRequest, res: Response) => {
	try {
	    const userId = req.user._id;
	    const status = req.query.status as string;
	    const tasks = await TaskService.getAllByUserIdAndStatus(userId, status);
	    res.status(200).json(tasks);
	} catch (error) {
	    res.status(500).json({ error: 'Internal Server Error' });
	}
    },

    getTaskById: async (req: Request, res: Response) => {
	try {
	    const { id } = req.params;
	    const task = await TaskService.getById(id);
	    if (!task) {
		res.status(404).json({ error: 'Task not found' });
	    } else {
		res.json(task);
	    }
	} catch (error) {
	    const err = error as Error;
	    res.status(500).json({ error: err.message });
	}
    },

    createTask: async (req: CustomRequest, res: Response) => {
	try {
	    const { title, description, dueDate, status, assignedTo } = req.body;
	    const taskId = await TaskService.create({ title, description, dueDate, status, assignedTo });
	    res.status(201).json({ id: taskId, message: 'Task created successfully' });
	} catch (error) {
	    const err = error as Error;
	    res.status(400).json({ error: err.message });
	}
    },

    updateTaskById: async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { title, description, dueDate, status, assignedTo } = req.body;
		await TaskService.updateById(id, { title, description, dueDate, status, assignedTo });
	    res.json({ message: 'Task updated successfully' });
	} catch (error) {
	    const err = error as Error;
	    res.status(400).json({ error: err.message });
	}
    },

    deleteTaskById: async (req: Request, res: Response) => {
	try {
	    const { id } = req.params;
	    await TaskService.deleteById(id);
	    res.json({ message: 'Task deleted successfully' });
	} catch (error) {
	    const err = error as Error;
	    res.status(400).json({ error: err.message });
	}
    }
};

export default TaskController;
