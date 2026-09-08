import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchBar({ onSearch, onClear, initialValue = "" }) {
  const [searchId, setSearchId] = useState(initialValue);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
      }}
      role="search"
    >
      <TextField
        label="Search Employee by ID"
        placeholder="Enter employee ID"
        value={searchId}
        onChange={(event) => setSearchId(event.target.value)}
        size="small"
        slotProps={{
          htmlInput: { "aria-label": "Search employee by ID" },
        }}
        sx={{ minWidth: 240 }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={!searchId.trim()}
      >
        Search
      </Button>

      <Button
        type="button"
        variant="outlined"
        onClick={handleClear}
        disabled={!searchId && !initialValue}
      >
        Clear
      </Button>
    </Box>
  );
}

export default SearchBar;
