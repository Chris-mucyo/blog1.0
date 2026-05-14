import express from 'express';
import { getUser, getUsers, removeUser, updateUser  } from '../controllers/users.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: User fetched successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  example: 123er4566hk2345abc
 *                username:
 *                  type: string
 *                  example: John Doe
 *                email:
 *                  type: string
 *                  example: johndoe@gmail.com
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getUser)


/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                      example: 664c8d91f1a2b3456789abc
 *                    username:
 *                      type: string
 *                      example: John Doe
 *                    email:
 *                      type: string
 *                      example: johndoe@gmail.com
 *       500:
 *         description: Server error
 */
router.get('/', getUsers)

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *      summary: Delete a user
 *      tags:
 *        - Users
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: UserID
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: User deleted successfully
 *        404:
 *          description: User not found
 *        500:
 *          description: Server error
*/
router.delete('/:id', removeUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateUser)

export default router;