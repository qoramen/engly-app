import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

const Navbar = () => {
    return (
        <Box sx={{
            backgroundColor: '#990100',
            display: 'flex',
            alignItems: 'center',
        }} 
        position={'sticky'} height={'10vh'}>
            <Container>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography variant='h3' fontSize={'6vh'} color='white'>Engly</Typography>
                    <Box>
                        <Typography variant='subtitle1' fontSize={'3vh'} sx={{ fontWeight: 200, color: 'white' }}>Tests</Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Navbar