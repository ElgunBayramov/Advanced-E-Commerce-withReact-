import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carousel from 'react-material-ui-carousel';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { UserType } from '../assets/types/sliceTypes';
import { setCurrentUser } from '../redux/reducers/appSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Access the current user from the Redux store
  const currentUser = useAppSelector((state) => state.app.currentUser);

  const images = [
    { url: "https://fastly.picsum.photos/id/241/800/400.jpg?hmac=joyUUPqCSjHTHvTHhHGnQ32sBDxnNoPVDlaahFNeQeQ", alt: "Nature Image" },
    { url: "https://fastly.picsum.photos/id/65/800/400.jpg?hmac=yS3NpJkbt0GOhyNCnXicDhi04Vvx-WFxgPAEKVoykpc", alt: "Water Image" },
    { url: "https://fastly.picsum.photos/id/185/800/400.jpg?hmac=gVXAxMT2cDEhSwhroZ-RVqLDyRBEv2stx7ocke_X_zc", alt: "City Image" },
    { url: "https://fastly.picsum.photos/id/44/800/400.jpg?hmac=xoTFsXUr0KKkMO8j2kMp6vxnpI3TrCXtSAPH6tZY7AM", alt: "Forest Image" }
  ];

  useEffect(() => {
    const result = localStorage.getItem("currentUser");
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser)); 
    }
    else{
      navigate("/login")
    }
  }, [dispatch,navigate]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Header />

      {/* Header Section */}
      <Box sx={{ backgroundColor: '#ff6600', padding: '20px', color: 'white', textAlign: 'center' }}>
        <Typography variant={isMobile ? 'h5' : 'h3'}>
        Welcome{currentUser ? `, ${currentUser.email.split('@')[0]}` : ''} to the Homepage
        </Typography>
        <Typography variant="subtitle1">This is a responsive homepage with dark and light mode toggle.</Typography>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ flex: '1', marginTop: '30px', marginBottom: '30px', width: '100%' }}>
        <Carousel>
          {images.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px', // Fixed height for images
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={item.url}
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
