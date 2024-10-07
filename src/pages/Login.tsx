import { Box, Button, Grid, TextField, Typography, useMediaQuery, useTheme, InputAdornment } from '@mui/material';
import { AccountCircle, Lock} from '@mui/icons-material'; // Import visibility icons
import { useFormik } from 'formik';
import { useState } from 'react';
import { MdVisibility,MdVisibilityOff } from "react-icons/md"
import { UserType } from '../assets/types/sliceTypes';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/LoginService';
import { useAppDispatch } from '../redux/store';
import { setCurrentUser, setLoading } from '../redux/reducers/appSlice';
import { loginFormSchemas } from '../schemas/LoginFormSchemas';

interface CheckUserType {
  result:boolean,
  currentUser:UserType | null
}

function Login() {
  const themeforMUI = useTheme();
  const isMobile = useMediaQuery(themeforMUI.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [showPassword, setShowPassword] = useState(false);

  const checkUser = (userList:UserType[],email:string,password:string):CheckUserType => {
    const response:CheckUserType = { result:false,currentUser:null}
    userList.forEach((user:UserType) => {
     if(user.email === email && user.password === password ){
      response.result = true,
      response.currentUser = user
     }
    })
    return response;
  }

  const submit = async(values:any,actions:any) => {
    try {
      dispatch(setLoading(true));
      const response:UserType[] = await loginService.getAllUsers();
      if (response) {
        const checkUserResponse: CheckUserType = checkUser(response, values.email, values.password);
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem("currentUser",JSON.stringify(checkUserResponse.currentUser))
          navigate("/");
        }
        else {
          toast.error("İstifadəçi adı və ya şifrə yanlışdır");
        }
      }
    } catch (error) {
      toast.error("Daxil olarkən xəta baş verdi!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit,resetForm } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormSchemas,
    onSubmit: submit,
  });

  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
    sx={{
      height: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <Box
        sx={{
          padding: isMobile ? '20px' : '40px',
          boxShadow: 3,
          backgroundColor: 'white',
          borderRadius: '8px',
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 3, textAlign: 'center',color:"black" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Email Input with Icon */}
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          {/* Password Input with Show/Hide Icon */}
          <TextField
            fullWidth
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'} 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={() => setShowPassword(!showPassword)} sx={{ padding: 0,fontSize:'20px' }}>
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />} {/* Toggle icon */}
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button
              color="info"
              variant="contained"
              type="submit"
              fullWidth
              sx={{ padding: '8px 0', fontSize: '14px', flex: 1 }}
            >
              Sign In
            </Button>
            <Button
              color="success"
              variant="contained"
              fullWidth
              type="button"
              sx={{ padding: '8px 0', fontSize: '14px', flex: 1 }}
              onClick={() => resetForm()}
            >
              Reset
            </Button>
          </Box>
        </form>

        {/* Register Redirect Text */}
        <Typography sx={{ mt: 2, textAlign: 'center',color:'black' }}>
          Hesabınız yoxdur? <Button component={Link} to="/register" color="info">Qeydiyyatdan keçin</Button>
        </Typography>
      </Box>
    </Grid>
  </Grid>
  )
}

export default Login