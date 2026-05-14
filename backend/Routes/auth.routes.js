import express from 'express';
import { Register, Login } from '../controllers/auth.controller.js'
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register users
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - email
 *              - password
 *
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *
 *               email:
 *                 type: string
 *                 example: JohnDoe@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: 12345678

 *     responses:
 *       200:
 *         description: Registered successfully
 */
router.post('/register', Register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login users
 *     tags:
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - email
 *              - password
 *
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *
 *               email:
 *                 type: string
 *                 example: JohnDoe@gmail.com
 *
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post('/login', Login);

export default router;