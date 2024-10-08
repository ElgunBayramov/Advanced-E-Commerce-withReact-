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
    { url: "https://www.asiaction.com/wp-content/uploads/furniture-import-blog.png", alt: "Nature Image" },
    { url: "https://media.licdn.com/dms/image/v2/D4D12AQHDE8G1TGFoOw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693383577655?e=2147483647&v=beta&t=scesqgZ3SmD_iMLOILfJyMgs1eERUtZ0je1y07bb7RY", alt: "Water Image" },
    { url: "https://media.licdn.com/dms/image/v2/C5612AQGOGS95pwSsUA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1584373295105?e=2147483647&v=beta&t=SIt6l8r7Ze4Ux1t7sDBu1nLwMQ1IEQJEGgmLLayKtzg", alt: "City Image" },
    { url: "https://media.licdn.com/dms/image/C5612AQEvSUsNtrnnKg/article-cover_image-shrink_600_2000/0/1634266228061?e=2147483647&v=beta&t=wTpVQG0uHSK6DCAiv5NPN7KVl11eHmE2J1hGdd8H21E", alt: "Forest Image" }
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
