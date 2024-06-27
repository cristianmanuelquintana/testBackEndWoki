import express from 'express';
import connectDB from './services/db';
import taskRoutes from './routes/tasks.routes';
import userRoutes from './routes/users.routes';
import projectRoutes from './routes/projects.routes';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
