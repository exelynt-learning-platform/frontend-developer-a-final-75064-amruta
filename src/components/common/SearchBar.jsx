import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchBar({ onSearch, onClear }) {
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    const id = searchId.trim();

    if (!id) {
      return;
    }

    onSearch(id);
  };

  const handleClear = () => {
    setSearchId("");
    onClear();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Search Employee by ID"
        placeholder="Enter employee ID"
        value={searchId}
        onChange={(event) => setSearchId(event.target.value)}
        size="small"
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={!searchId.trim()}
      >
        Search
      </Button>

      <Button variant="outlined" onClick={handleClear}>
        Clear
      </Button>
    </Box>
  );
}

export default SearchBar;
