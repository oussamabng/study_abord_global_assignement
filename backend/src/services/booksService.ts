import axios from "axios";
import { BookSearchQuery, FetchBooksResponse } from "../interfaces";

const BASE_URL = "https://openlibrary.org/search.json";

export const bookService = {
  fetchBooks: async ({
    q,
    page,
    sort,
    limit,
  }: BookSearchQuery): Promise<FetchBooksResponse> => {
    try {
      const params = {
        q,
        page,
        limit,
        sort: sort.toLowerCase(),
        fields:
          "title,author_name,first_publish_year,ratings_average,first_sentence",
      };

      const response = await axios.get(BASE_URL, { params });

      const books = response.data.docs.map((doc: any) => ({
        title: doc.title || "Unknown",
        author: doc.author_name?.join(", ") || "Unknown",
        publishedYear: doc.first_publish_year || "Unknown",
        rating: doc.ratings_average
          ? parseFloat(doc.ratings_average.toFixed(1))
          : "N/A",
        firstSentence: Array.isArray(doc.first_sentence)
          ? doc.first_sentence[0]
          : doc.first_sentence || "No description available",
      }));

      return { books, totalBooks: response.data.num_found };
    } catch (error: any) {
      console.error(
        "Error fetching data from Open Library API:",
        error.message
      );
      throw new Error("Failed to fetch data from Open Library API.");
    }
  },
};
