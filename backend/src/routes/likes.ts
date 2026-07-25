import { Router } from "express";
import { toggleLike } from "../controllers/like.controller";
import auth from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * /api/v1/likes/{targetId}/toggle:
 *   post:
 *     tags: [Likes]
 *     summary: Toggle like/unlike on a post or comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: targetId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [targetType]
 *             properties:
 *               targetType:
 *                 type: string
 *                 enum: [post, comment]
 *     responses:
 *       200:
 *         description: Like status toggled
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Target not found
 */
router.post("/:targetId/toggle", auth, toggleLike);
router.post("/:targetId", auth, toggleLike);

export default router;
