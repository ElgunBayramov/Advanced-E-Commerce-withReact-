import { Logout,Menu } from '@mui/icons-material';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { toggleTheme } from '../redux/reducers/appSlice';
import { FaMoon } from 'react-icons/fa';
import { CiLight } from 'react-icons/ci';

function Header() {
    const {theme} = useAppSelector((state) => state.app)
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const themeforMUI = useTheme();
  const isMobile = useMediaQuery(themeforMUI.breakpoints.down('sm'));
  const dispatch = useAppDispatch()

  const changeTheme = () => {
    const root = document.getElementById("root")
    if(theme){
      root!.style.backgroundColor = "#03132a";
      root!.style.color = "#fff";
    }
    else{
      root!.style.backgroundColor = "#fff";
      root!.style.color = "black";
    }
    dispatch(toggleTheme())
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  const drawer = (
    <Box sx={{
        width: 250,
        backgroundColor: theme ? 'white' : '#03132a', 
        color: theme ? 'white' : 'black',           
        height: '100%',                             
        padding: '16px',
      }}>
      <Button component={Link} to="/" onClick={() => setDrawerOpen(false)} sx={{ textAlign: 'left', width: '100%' }}>
        Home
      </Button>
      <Button component={Link} to="/products" onClick={() => setDrawerOpen(false)} sx={{ textAlign: 'left', width: '100%' }}>
        Products
      </Button>
      <Button onClick={handleLogout} sx={{ textAlign: 'left', width: '100%' }}>
        <Logout /> Logout
      </Button>
    </Box>
  );
  return (
   
        <AppBar position="static" sx={{background:'#12304e'}}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              My Website
            </Typography>

            {isMobile ? (
              <>
               <IconButton color="inherit" >
               {theme ? (
            <FaMoon className="react-icon" onClick={changeTheme} />
          ) : (
            <CiLight className="react-icon" onClick={changeTheme} />
          )}
      </IconButton>
                {/* Hamburger menu icon for mobile view */}
                <IconButton color="inherit" onClick={handleDrawerToggle}>
                  <Menu />
                </IconButton>

                {/* Drawer for mobile menu */}
                <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                  {drawer}
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* TextButton for desktop view */}
                <Button component={Link} to="/" sx={{ color: 'white' }}>
                  Home
                </Button>
                <Button component={Link} to="/products" sx={{ color: 'white' }}>
                  Products
                </Button>

                {/* Theme Toggle Icon positioned to the right of "Home" and "Products" */}
                <IconButton color="inherit" sx={{ marginLeft: 'auto' }}>
                {theme ? (
            <FaMoon className="react-icon" onClick={changeTheme} />
          ) : (
            <CiLight className="react-icon" onClick={changeTheme} />
          )}
                </IconButton>
              </Box>
            )}

            {/* Logout Icon (Remains on the right in both modes) */}
            {!isMobile && (
              <IconButton color="inherit" onClick={handleLogout}>
                <Logout />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
  
  )
}

export default Header