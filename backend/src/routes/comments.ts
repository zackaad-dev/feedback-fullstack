import { Router } from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.controller";
import auth, { optionalAuth } from "../middleware/auth";

const router = Router({ mergeParams: true });

/**
 * @swagger
 * /api/v1/comments:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments for a post
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments
 */
router.get("/", optionalAuth, getComments);

/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Create a new comment on a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId, content]
 *             properties:
 *               postId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/", auth, createComment);

/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 */
router.delete("/:id", auth, deleteComment);

export default router;
