import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import '../styles/Navbar.css';
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  token: string | false;
}

export default function Navbar({token}:NavbarProps) { 

  const navigate = useNavigate();

    function handleLogout() {
    localStorage.removeItem("token"); 
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Notes-Taking App
          </Typography>
        {   token ? (
            <div className="logout_btn"> 
            <Button color="inherit" onClick={handleLogout} > Logout </Button>
            </div> 
          ) : null
        }   
        </Toolbar>
      </AppBar>
    </Box>
  );
}