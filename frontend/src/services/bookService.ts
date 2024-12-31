import axios from "axios";
import { FetchBooksResponse } from "../types";

const BASE_URL = "http://localhost:8080/api";

export const fetchBooks = async (
  query: string,
  page: number,
  sort: string,
  limit: number
): Promise<FetchBooksResponse> => {
  const response = await axios.get<FetchBooksResponse>(`${BASE_URL}/books`, {
    params: { q: query, page, sort, limit },
  });
  return response.data;
};
