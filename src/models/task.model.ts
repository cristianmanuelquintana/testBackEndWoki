import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    status: 'not started' | 'in progress' | 'completed';
    assignedTo?: mongoose.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    dueDate: { type: Date },
    status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
    assignedTo: { type: mongoose.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
export { ITask };
