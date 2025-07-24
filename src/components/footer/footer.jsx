import { Box, colors, Container, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box height={'10vh'} sx={{backgroundColor: '#e8e8e8', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Container>
            <Typography variant='body1'>
                &copy; 2025 CD IELTS Mock made by <span style={{color: '#b90504', cursor: 'pointer'}}>Blackcoder</span>
            </Typography>
        </Container>
    </Box>
  )
}

export default Footer