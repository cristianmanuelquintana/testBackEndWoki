import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';

interface UserInput {
    name: string;
    email: string;
    password: string;
}

const UserService = {
    getAll: (): Promise<IUser[]> => User.find().exec(),

    getById: (id: string): Promise<IUser | null> => User.findById(id).exec(),

    create: async ({ name, email, password }: UserInput): Promise<string> => {
        const newUser = new User({ name, email, password });
        await newUser.save();
        return newUser.toString();
    },

    updateById: async (id: string, { name, email, password }: Partial<UserInput>): Promise<void> => {
        await User.findByIdAndUpdate(id, { name, email, password });
    },

    deleteById: (id: string): Promise<IUser | null> => User.findByIdAndDelete(id).exec(),

    register: async ({ name, email, password }: { name: string, email: string, password: string }): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return newUser.toString();
    },

    authenticate: async (email: string, password: string): Promise<IUser | null> => {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;

        return user;
    }
};

export default UserService;
