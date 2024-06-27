import Project, { IProject } from '../models/project.model';
import User from '../models/user.model';

interface ProjectInput {
    title: string;
    description?: string;
    dueDate?: Date;
    status?: 'not started' | 'in progress' | 'completed';
    members: string[];
}

const ProjectService = {
        getAll: (status?: string): Promise<IProject[]> => {
            if (status) {
                return Project.find({ status }).exec();
            }
            return Project.find().exec();
        },

        getAllByUserIdAndStatus: async (userId: string, status?: string): Promise<IProject[]> => {
            const user = await User.findById(userId).populate({
                path: 'projects',
                match: status ? { status } : {}
            }).exec();
    
            // Ensure that the populated `projects` field is of type `IProject[]`
            return (user?.projects as IProject[]) || [];
        },

        addUserToProject: async (projectId: string, userId: string): Promise<IProject | null> => {
            const project = await Project.findById(projectId);
            const user = await User.findById(userId);
    
            if (project && user) {
                project.members.push(userId);
                await project.save();
    
                return project;
            }
            return null;
        },
    
        getById: (id: string): Promise<IProject | null> => Project.findById(id).exec(),
    
        create: async ({ title, description, dueDate, status, members }: ProjectInput): Promise<string> => {
            const newProject = new Project({ title, description, dueDate, status, members });
            await newProject.save();
            return newProject.toString();
        },
    
        updateById: async (id: string, { title, description, dueDate, status, members }: Partial<ProjectInput>): Promise<string> => {
            await Project.findByIdAndUpdate(id, { title, description, dueDate, status, members });
            return Project.toString();
        },
    
        deleteById: (id: string): Promise<IProject | null> => Project.findByIdAndDelete(id).exec()
    };
    
    export default ProjectService;
    
