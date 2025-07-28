import { Box, Container, Typography } from '@mui/material'
import '../app/app.css'

const Main = () => {
    return (
        <Box sx={{
            backgroundImage: `url(https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}
            height={'80vh'}
        >
            <Box height={'100%'} width={'100%'} sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Container>
                    <Box textAlign={'center'}>
                        <Typography variant='h3' mb={1} color='#f6f6f6'>CD IELTS Mock Tests</Typography>
                        <Typography variant='body1' mb={2} color='#e8e8e8' sx={{ fontSize: '20px', }}>Practice real computer-delivered IELTS tests to boost your confidence and get your target band
                            score.</Typography>
                        <button className='btn-main'>View Tests</button>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Main