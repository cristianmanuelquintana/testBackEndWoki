import Task, { ITask } from '../models/task.model';
import User from '../models/user.model';
import { Types } from 'mongoose';

interface TaskInput {
    title: string;
    description?: string;
    dueDate?: Date;
    status?: 'not started' | 'in progress' | 'completed';
    assignedTo?: string;
}

const TaskService = {
    getAll: (status?: string): Promise<ITask[]> => {
        if (status) {
            return Task.find({ status }).exec();
        }
        return Task.find().exec();
    },

    getAllByUserIdAndStatus: async (userId: string, status?: string): Promise<ITask[]> => {
        return Task.find({ assignedTo: userId, ...(status && { status }) }).exec();
    },

    assignTaskToUser: async (taskId: string, userId: string): Promise<ITask | null> => {
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if (task && user) {
            task.assignedTo = user._id as Types.ObjectId;
            await task.save();

            return task;
        }

        return null;
    },

    getById: (id: string): Promise<ITask | null> => Task.findById(id).exec(),

    create: async ({ title, description, dueDate, status, assignedTo }: TaskInput): Promise<string> => {
        const newTask = new Task({ title, description, dueDate, status, assignedTo });
        await newTask.save();
        return newTask.toString();
    },

    updateById: async (id: string, { title, description, dueDate, status, assignedTo }: Partial<TaskInput>): Promise<void> => {
        await Task.findByIdAndUpdate(id, { title, description, dueDate, status, assignedTo });
    },

    deleteById: (id: string): Promise<ITask | null> => Task.findByIdAndDelete(id).exec()
};

export default TaskService;
