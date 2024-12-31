import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  Typography,
  Paper,
  Tooltip,
  SelectChangeEvent,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchBooks } from "../services/bookService";
import { FetchBooksResponse } from "../types";

const Books: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const limitParam = parseInt(searchParams.get("limit") || "5", 10);
  const [sort, setSort] = useState("random");

  const { data, isLoading } = useQuery<FetchBooksResponse>({
    queryKey: ["books", initialQuery, pageParam, sort, limitParam],
    queryFn: () => fetchBooks(initialQuery, pageParam, sort, limitParam),
    enabled: !!initialQuery,
  });

  const handleSearch = () => {
    setSearchParams({
      q: searchQuery,
      page: "1",
      limit: limitParam.toString(),
    });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
    setSearchParams({
      q: initialQuery,
      page: "1",
      limit: limitParam.toString(),
    });
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setSearchParams({
      q: initialQuery,
      page: (newPage + 1).toString(),
      limit: limitParam.toString(),
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    setSearchParams({ q: initialQuery, page: "1", limit: newLimit.toString() });
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Box
          component="img"
          src="/logo.svg"
          alt="SAG Logo"
          sx={{ width: 150 }}
        />
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </Box>

      {isLoading ? (
        <LoadingSpinner />
      ) : data && data.books.length > 0 ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", py: 2 }}>
            <Select
              value={sort}
              onChange={handleSortChange}
              sx={{ width: 150 }}
              size="small"
            >
              <MenuItem value="random">Default</MenuItem>
              <MenuItem value="new">Newest</MenuItem>
              <MenuItem value="old">Oldest</MenuItem>
            </Select>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell>Publish Year</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>First Sentence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.books.map((book) => (
                    <TableRow key={book.title}>
                      <Tooltip title={book.title}>
                        <TableCell>{book.title}</TableCell>
                      </Tooltip>
                      <Tooltip title={book.author}>
                        <TableCell>{book.author}</TableCell>
                      </Tooltip>
                      <TableCell>{String(book.publishedYear)}</TableCell>
                      <TableCell>{book.rating}</TableCell>
                      <Tooltip title={book.firstSentence}>
                        <TableCell>{book.firstSentence}</TableCell>
                      </Tooltip>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.totalBooks}
              page={pageParam - 1}
              onPageChange={handleChangePage}
              rowsPerPage={limitParam}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Typography sx={{ mt: 4, textAlign: "center", color: "gray" }}>
            No books found {initialQuery.length > 0 && `for "${initialQuery}"`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Books;
