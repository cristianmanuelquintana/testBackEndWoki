import { Request, Response } from 'express';
import UserService from '../services/users.service';
import { CustomRequest } from '../middleware/auth.middleware';
import jwt from 'jsonwebtoken';


const UserController = {
    registerUser: async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('register');
            const userId = await UserService.register(req.body);
            res.status(201).json({ userId });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },

    loginUser: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await UserService.authenticate(email, password);
    
            if (!user) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: '1h'
            });
    
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    },
    getAllUsers: async (req: CustomRequest, res: Response) => {
        try {
            const users = await UserService.getAll();
            res.json(users);
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await UserService.getById(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    },

    createUser: async (req: CustomRequest, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const userId = await UserService.create({ name, email, password });
            res.status(201).json({ id: userId, message: 'User created successfully' });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    },

    updateUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            await UserService.updateById(id, { name, email, password });
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    },

    deleteUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await UserService.deleteById(id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            const err = error as Error;
            res.status(400).json({ error: err.message });
        }
    }
};

export default UserController;
