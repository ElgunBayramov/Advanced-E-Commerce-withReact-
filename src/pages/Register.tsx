import { Box, Button, Grid, TextField, Typography, useMediaQuery, useTheme, InputAdornment } from '@mui/material';
import { AccountCircle, Lock} from '@mui/icons-material'; // Import visibility icons
import { useFormik } from 'formik';
import { useState } from 'react';
import { MdVisibility,MdVisibilityOff } from "react-icons/md"
import { registerFormSchemas } from '../schemas/RegisterFormSchemas';
import { UserType } from '../assets/types/sliceTypes';
import registerService from '../services/RegisterService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const themeforMUI = useTheme();
  const isMobile = useMediaQuery(themeforMUI.breakpoints.down('sm'));
  
  const [showPassword, setShowPassword] = useState(false);

  const submit = async(values:any) => {
   
    try {
      const payload:UserType = {
        id:String(Math.floor(Math.random()*999999)),
        email:values.email,
        password:values.password,
        balance:1000
      }
      const response = await registerService.AddNewUser(payload)
      if(response){
        resetForm()
        toast.success("Registration completed successfully.")
        navigate("/login")
      }
    } catch (error) {
      toast.error("An error occurred while signing up.")
    }
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit,resetForm } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerFormSchemas,
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
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Username Input with Icon */}
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

            {/* Confirm Password Input with Show/Hide Icon */}
            <TextField
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'} 
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={{ mb: 3 }}
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
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ padding: '8px 0', fontSize: '14px', flex: 1 }}
              >
                Sign Up
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
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
