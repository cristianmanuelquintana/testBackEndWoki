import express from 'express';
import UserController from '../controllers/users.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id',authenticateJWT,  UserController.getUserById);
/**
 * @swagger
 * /users/register:
 *     post:
 *         summary: Register a new user
 *         tags: [Users]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         required:
 *                             - name
 *                             - email
 *                             - password
 *                         properties:
 *                             name:
 *                                 type: string
 *                             email:
 *                                 type: string
 *                             password:
 *                                 type: string
 *                                 format: password
 *         responses:
 *             201:
 *                 description: User registered successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 userId:
 *                                     type: string
 *             400:
 *                 description: Invalid input
 */
router.post('/register',authenticateJWT,  UserController.registerUser);
/**
 * @swagger
 * /users/login:
 *     post:
 *         summary: Login a user
 *         tags: [Users]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         required:
 *                             - email
 *                             - password
 *                         properties:
 *                             email:
 *                                 type: string
 *                             password:
 *                                 type: string
 *                                 format: password
 *         responses:
 *             200:
 *                 description: User logged in successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 token:
 *                                     type: string
 *             401:
 *                 description: Invalid email or password
 */
router.post('/login', UserController.loginUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUserById);
router.delete('/:id', UserController.deleteUserById);


export default router;
