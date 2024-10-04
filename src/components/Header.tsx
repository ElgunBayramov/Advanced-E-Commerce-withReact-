import React, { useState } from 'react';
import { AppBar, Badge, Box, Button, Drawer, IconButton, TextField, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setCurrentUser, toggleTheme } from '../redux/reducers/appSlice';
import { FaMoon, FaShoppingBasket } from 'react-icons/fa';
import { CiLight, CiShoppingBasket } from 'react-icons/ci';
import { toast } from 'react-toastify';
import { filterProducts } from '../redux/reducers/productSlice';
import { getAllProducts } from '../redux/actions/productAction';
import { UserType } from '../assets/types/sliceTypes';

function Header() {
    const { baskets } = useAppSelector((state) => state.basket);
    const currentUserString = localStorage.getItem("currentUser");
    const { theme } = useAppSelector((state) => state.app);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const themeforMUI = useTheme();
    const isMobile = useMediaQuery(themeforMUI.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    let basketLength = 0; // Declare basketLength outside the condition
    if (currentUserString) {
        const currentUser: UserType = JSON.parse(currentUserString);
        const userBasket = baskets[currentUser.id] || [];
        basketLength = userBasket.length; // Assign value to basketLength
    }

    const changeTheme = () => {
        const root = document.getElementById("root");
        if (theme) {
            root!.style.backgroundColor = "black";
            root!.style.color = "#fff";
        } else {
            root!.style.backgroundColor = "#fff";
            root!.style.color = "black";
        }
        dispatch(toggleTheme());
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("Hesabdan çıxıldı");
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                await dispatch(filterProducts(e.target.value));
            } else {
                await dispatch(getAllProducts());
            }
        } catch (error) {
            toast.error("Axtarış edilərkən xəta baş verdi");
        }
    };

    const drawer = (
        <Box sx={{
            width: 250,
            backgroundColor: theme ? 'white' : '#12304e',
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
                            {location.pathname === "/products" && (
                                <TextField
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                                    placeholder="Search..."
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '4px',
                                        width: { xs: '100px', sm: '200px', md: '300px' },
                                        marginRight: '8px'
                                    }}
                                />
                            )}
                            <Badge badgeContent={basketLength} color="success">
                                <CiShoppingBasket className="react-icon" />
                            </Badge>
                            <IconButton color="inherit">
                                {theme ? (
                                    <FaMoon className="react-icon" onClick={changeTheme} />
                                ) : (
                                    <CiLight className="react-icon" onClick={changeTheme} />
                                )}
                            </IconButton>
                            <IconButton color="inherit" onClick={handleDrawerToggle}>
                                <Menu />
                            </IconButton>
                        </Box>

                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {location.pathname === "/products" && (
                            <TextField
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                                placeholder="Search..."
                                variant="outlined"
                                size="small"
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    width: { xs: '100px', sm: '200px', md: '300px' },
                                    marginRight: '16px'
                                }}
                            />
                        )}
                        <IconButton>
                            <Badge badgeContent={basketLength} color="success">
                                <FaShoppingBasket className="react-icon" />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" sx={{ marginRight: '16px' }}>
                            {theme ? (
                                <FaMoon className="react-icon" onClick={changeTheme} />
                            ) : (
                                <CiLight className="react-icon" onClick={changeTheme} />
                            )}
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <Logout className='react-icon' />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
