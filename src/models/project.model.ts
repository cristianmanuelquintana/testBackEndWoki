import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description?: string;
    dueDate?: Date;
    status: 'not started' | 'in progress' | 'completed';
    members: string[];
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ['not started', 'in progress', 'completed'], default: 'not started' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Project = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
