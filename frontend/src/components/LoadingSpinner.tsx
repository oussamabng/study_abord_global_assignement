import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingSpinner: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "70vh",
    }}
  >
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
