import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Employee Management
        </Typography>

        <Box>
          <Button component={Link} to="/employees" color="inherit">
            Employees
          </Button>

          <Button component={Link} to="/employees/add" color="inherit">
            Add Employee
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
