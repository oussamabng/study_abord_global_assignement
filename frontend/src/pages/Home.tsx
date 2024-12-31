import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(
        `/books?q=${encodeURIComponent(searchQuery.trim())}&limit=5&page=1`
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        padding: "60px",
      }}
    >
      <Box
        component="img"
        src="/logo.svg"
        alt="SAG Logo"
        sx={{ width: 180, mb: 4 }}
      />
      <Typography
        variant="h5"
        sx={{ mb: 2, color: "#333", textAlign: "center" }}
      >
        Book Search Assignment
      </Typography>
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
    </Box>
  );
}

export default Home;
