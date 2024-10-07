import React, { useState } from 'react';
import { AppBar, Badge, Box, Button, Drawer, IconButton, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCurrentUser, toggleTheme } from '../redux/reducers/appSlice';
import { FaMoon, FaShoppingBasket } from 'react-icons/fa';
import { CiLight, CiShoppingBasket } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { setDrawer } from '../redux/reducers/basketSlice';

function Header() {
    const { baskets } = useAppSelector((state) => state.basket);
    const currentUserString = localStorage.getItem("currentUser");

    const { theme } = useAppSelector((state) => state.app);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const themeforMUI = useTheme();
    const isMobile = useMediaQuery(themeforMUI.breakpoints.down('sm'));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    let basketLength = 0;
    if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        const userBasket = baskets[currentUser.id] || [];
        basketLength = userBasket.length;
    }

    const handleBasketDetails = () => {
        dispatch(setDrawer(true));
    };

    return (
        <AppBar position="static" sx={{ background: '#12304e' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://logos-world.net/wp-content/uploads/2022/05/Alibaba-Logo.png" style={{ width: '120px', marginRight: '16px' }} />
                    {!isMobile && (
                        <>
                            <Button component={Link} to="/" sx={{ color: 'white' }}>
                                Home
                            </Button>
                            <Button component={Link} to="/products" sx={{ color: 'white' }}>
                                Products
                            </Button>
                        </>
                    )}
                </Box>

                {isMobile ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Badge badgeContent={basketLength} color="success">
                                <CiShoppingBasket onClick={handleBasketDetails} className="react-icon" />
                            </Badge>
                            <IconButton color="inherit">
                                {theme ? (
                                    <FaMoon className="react-icon" onClick={() => dispatch(toggleTheme())} />
                                ) : (
                                    <CiLight className="react-icon" onClick={() => dispatch(toggleTheme())} />
                                )}
                            </IconButton>
                            <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)}>
                                <Menu />
                            </IconButton>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge badgeContent={basketLength} color="success">
                            <FaShoppingBasket onClick={handleBasketDetails} className="react-icon" />
                        </Badge>
                        <IconButton color="inherit" onClick={() => dispatch(toggleTheme())}>
                            {theme ? <FaMoon className="react-icon" /> : <CiLight className="react-icon" />}
                        </IconButton>
                        <IconButton color="inherit" onClick={() => navigate("/login")}>
                            <Logout className='react-icon' />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
