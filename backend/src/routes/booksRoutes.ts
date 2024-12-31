import { Router } from "express";
import { booksController } from "../controllers/booksController";

const booksRouter = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Search books
 *     description: Fetch books using the Open Library API based on a search query.
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: "The search query."
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: "The page number (default: 1)."
 *     responses:
 *       200:
 *         description: A list of books.
 *       400:
 *         description: Invalid request.
 */
booksRouter.get("/", booksController.getBooks);

export { booksRouter };
