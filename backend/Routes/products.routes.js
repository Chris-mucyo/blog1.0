import express from "express";

import {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a Product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - description
 *                - category
 *                - price
 *
 *              properties:
 *                name:
 *                  type: string
 *                  example: Nike AirForce 1
 *
 *                description:
 *                  type: string
 *                  example: This a black and white Air Force one from uk
 *
 *                category:
 *                  type: string
 *                  example: Shoes
 *
 *                price:
 *                  type: number
 *                  example: 20000
 *
 *     responses:
 *       201:
 *         description: Successfully created product
 *
 *       500:
 *         description: Something went wrong
 *
 */

router.post("/", createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get All Products
 *     tags:
 *        - Products
 *     responses:
 *        200:
 *          description: Fetching All Products
 *          content:
 *              application/json:
 *                 schema:
 *                   type: array
 *                   items:
 *                      type: object
 *                      properties:
 *                        _id:
 *                          type: string
 *                          example: 664c8d91f1a2b3456789abc
 *                        name:
 *                          type: string
 *                          example: Nike Air Force 1
 *
 *                        description:
 *                          type: string
 *                          example: This a black and white Air Force one from uk
 *
 *                        category:
 *                          type: string
 *                          example: Shoes
 *
 *                        price:
 *                          type: number
 *                          example: 20000
 *
 *        500:
 *          description: Something Went wrong
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 123er4566hk2345abc
 *                 name:
 *                   type: string
 *                   example: Nike Air Force
 *                 description:
 *                   type: string
 *                   example: This is a black and white Air Force One from UK
 *                 category:
 *                   type: string
 *                   example: Shoes
 *                 price:
 *                   type: number
 *                   example: 20000
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *            type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                 name:
 *                   type: string
 *                   example: Nike Air Force
 *                 description:
 *                   type: string
 *                   example: This is a black and white Air Force One from UK
 *                 category:
 *                   type: string
 *                   example: Shoes
 *                 price:
 *                   type: number
 *                   example: 20000
 *
 *     response:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Delete a product
 *      tags:
 *        - Products
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Product ID
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
router.delete("/:id", deleteProduct);

export default router;