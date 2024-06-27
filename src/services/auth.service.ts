import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user.model';

const secretKey = 'your-secret-key'; // Should be in environment variables

const AuthService = {
    register: async (name: string, email: string, password: string): Promise<string> => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1h' });
    },

    login: async (email: string, password: string): Promise<string> => {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        return jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    },

    verifyToken: (token: string): any => {
        return jwt.verify(token, secretKey);
    }
};

export default AuthService;
