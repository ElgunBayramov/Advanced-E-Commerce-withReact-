import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <Box
    sx={{
      backgroundColor: '#12304e',
      padding: '10px',
      color: 'white',
      textAlign: 'center',
      mt: 'auto',
    }}
  >
    <Typography variant="body2">&copy; 2024 Your Company. All rights reserved.</Typography>
  </Box>
  )
}

export default Footer