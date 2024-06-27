import express from 'express';
import TaskController from '../controllers/tasks.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *     get:
 *         summary: Retrieve a list of tasks
 *         tags: [Tasks]
 *         responses:
 *             200:
 *                 description: List of tasks
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Task'
 */
router.get('/',authenticateJWT,  TaskController.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *     get:
 *         summary: Retrieve a single task by ID
 *         tags: [Tasks]
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The task ID
 *         responses:
 *             200:
 *                 description: Task data
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Task'
 *             404:
 *                 description: Task not found
 */
router.get('/:id',authenticateJWT,  TaskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *     post:
 *         summary: Create a new task
 *         tags: [Tasks]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Task'
 *         responses:
 *             201:
 *                 description: Task created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Task'
 *             400:
 *                 description: Invalid input
 */
router.post('/',authenticateJWT,  TaskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *     put:
 *         summary: Update a task by ID
 *         tags: [Tasks]
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The task ID
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Task'
 *         responses:
 *             200:
 *                 description: Task updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Task'
 *             400:
 *                 description: Invalid input
 *             404:
 *                 description: Task not found
 */
router.put('/:id',authenticateJWT,  TaskController.updateTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *     delete:
 *         summary: Delete a task by ID
 *         tags: [Tasks]
 *         parameters:
 *             - in: path
 *                 name: id
 *                 schema:
 *                     type: string
 *                 required: true
 *                 description: The task ID
 *         responses:
 *             200:
 *                 description: Task deleted successfully
 *             404:
 *                 description: Task not found
 */
router.delete('/:id',authenticateJWT, TaskController.deleteTaskById);

/**
 * @swagger
 * /tasks/assign:
 *     post:
 *         summary: Assign a task to a user
 *         tags: [Tasks]
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             taskId:
 *                                 type: string
 *                             userId:
 *                                 type: string
 *         responses:
 *             200:
 *                 description: Task assigned to user
 *             404:
 *                 description: Task or user not found
 *             500:
 *                 description: Server error
 */
router.post('/assign', authenticateJWT, TaskController.assignTaskToUser);

/**
 * @swagger
 * /tasks/user:
 *     get:
 *         summary: Retrieve a list of tasks assigned to the user, filtered by status
 *         tags: [Tasks]
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: query
 *                 name: status
 *                 schema:
 *                     type: string
 *                 description: The status of the tasks to filter by (not started, in progress, completed)
 *         responses:
 *             200:
 *                 description: List of tasks
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: array
 *                             items:
 *                                 $ref: '#/components/schemas/Task'
 *             401:
 *                 description: Unauthorized
 */
router.get('/user', authenticateJWT, TaskController.getTasksByUserAndStatus);

export default router;
