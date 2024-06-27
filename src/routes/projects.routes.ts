import { Router } from 'express';
import ProjectController from '../controllers/projects.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /projects:
 *     get:
 *         summary: Retrieve a list of projects
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         responses:
 *             200:
 *                 description: List of projects
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Project'
 */
router.get('/', authenticateJWT, ProjectController.getAllProjects);

/**
 * @swagger
 * /projects/{id}:
 *     get:
 *         summary: Retrieve a single project by ID
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The project ID
 *         responses:
 *             200:
 *                 description: Project data
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Project'
 *             404:
 *                 description: Project not found
 */
router.get('/:id', authenticateJWT, ProjectController.getProjectById);

/**
 * @swagger
 * /projects/user:
 *     get:
 *         summary: Retrieve a list of projects the user is a part of, filtered by status
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: query
 *                 name: status
 *                 schema:
 *                     type: string
 *                 description: The status of the projects to filter by (not started, in progress, completed)
 *         responses:
 *             200:
 *                 description: List of projects
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Project'
 *             401:
 *                 description: Unauthorized
 */
router.get('/user', authenticateJWT, ProjectController.getProjectsByUserAndStatus);

/**
 * @swagger
 * /projects:
 *     post:
 *         summary: Create a new project
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Project'
 *         responses:
 *             201:
 *                 description: Project created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Project'
 *             400:
 *                 description: Invalid input
 */
router.post('/', authenticateJWT, ProjectController.createProject);

/**
 * @swagger
 * /projects/addUser:
 *     post:
 *         summary: Add a user to a project
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             projectId:
 *                                 type: string
 *                             userId:
 *                                 type: string
 *         responses:
 *             200:
 *                 description: User added to project
 *             404:
 *                 description: Project or user not found
 *             500:
 *                 description: Server error
 */
router.post('/addUser', authenticateJWT, ProjectController.addUserToProject);

/**
 * @swagger
 * /projects/{id}:
 *     put:
 *         summary: Update a project by ID
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The project ID
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Project'
 *         responses:
 *             200:
 *                 description: Project updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Project'
 *             400:
 *                 description: Invalid input
 *             404:
 *                 description: Project not found
 */
router.put('/:id', authenticateJWT, ProjectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *     delete:
 *         summary: Delete a project by ID
 *         tags: [Projects]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The project ID
 *         responses:
 *             200:
 *                 description: Project deleted successfully
 *             404:
 *                 description: Project not found
 */
router.delete('/:id', authenticateJWT, ProjectController.deleteProject);

export default router;
