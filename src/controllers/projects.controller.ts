import { Request, Response } from 'express';
import ProjectService from '../services/projects.service';
import { CustomRequest } from '../middleware/auth.middleware';

const ProjectController = {
    getAllProjects: async (req: CustomRequest, res: Response) => {
        try {
            const projects = await ProjectService.getAll(req.user?.id);
            res.json(projects);
        } catch (error) {
                const err = error as Error;
                res.status(400).json({ error: err.message });
        }
    },

    addUserToProject: async (req: Request, res: Response): Promise<void> => {
        const { projectId, userId } = req.body;

        try {
            const project = await ProjectService.addUserToProject(projectId, userId);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'Project or user not found' });
            }
        } catch (error) {
            const err = error as Error;
            res.status(500).json({ error: err.message });
        }
    },

    getProjectsByUserAndStatus: async (req: CustomRequest, res: Response) => {
        try {
            const userId = req.user._id;
            const status = req.query.status as string;
            const projects = await ProjectService.getAllByUserIdAndStatus(userId, status);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getProjectById: async (req: Request, res: Response) => {
        try {
            const project = await ProjectService.getById(req.params.id);
            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }
            res.json(project);
        } catch (error) {
                const err = error as Error;
                res.status(400).json({ error: err.message });
        }
    },

    createProject: async (req: CustomRequest, res: Response) => {
        try {
            const projectId = await ProjectService.create({ ...req.body, owner: req.user?.id });
            res.status(201).json({ id: projectId });
        } catch (error) {
                const err = error as Error;
                res.status(400).json({ error: err.message });
        }
    },

    updateProject: async (req: Request, res: Response) => {
        try {
            await ProjectService.updateById(req.params.id, req.body);
            res.status(204).send();
        } catch (error) {
                const err = error as Error;
                res.status(400).json({ error: err.message });
        }
    },

    deleteProject: async (req: Request, res: Response) => {
        try {
            await ProjectService.deleteById(req.params.id);
            res.status(204).send();
        } catch (error) {
                const err = error as Error;
                res.status(400).json({ error: err.message });
        }
    }
};

export default ProjectController;
