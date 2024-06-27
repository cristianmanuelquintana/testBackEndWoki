import mongoose, { Document, Schema } from 'mongoose';
import { IProject } from './project.model';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    projects: IProject[];
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
export { IUser };
