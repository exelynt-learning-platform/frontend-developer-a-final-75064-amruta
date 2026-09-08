import { Box, Container } from "@mui/material";
import Header from "./Header";

function MainLayout({ children }) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}

export default MainLayout;
