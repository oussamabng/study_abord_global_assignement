import { Request, Response, NextFunction } from "express";
import { bookService } from "../services/booksService";
import { BookSearchQuery } from "../interfaces";

export const booksController = {
  getBooks: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { q, page = 1, sort = "random", limit = 5 } = req.query;

      if (!q || typeof q !== "string") {
        res.status(400).json({ error: "Query parameter 'q' is required." });
        return;
      }

      const searchQuery: BookSearchQuery = {
        q,
        page: +page,
        sort: sort as string,
        limit: +limit,
      };

      const books = await bookService.fetchBooks(searchQuery);
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  },
};
