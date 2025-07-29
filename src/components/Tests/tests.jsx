import { Box, Card,CardContent, Container, Typography } from "@mui/material"
import whatwedo from '../../whatwedo.json'

const Test = () => {
    const data = whatwedo.card
    return (
        <>
            <Box sx={{
                position: 'relative',
                height: '200px',
                width: '100%',
                backgroundImage: 'url(/image/media.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }
            }}>
                <Box height={'100%'} width={'100%'} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                }}>
                    <Container>
                        <Box textAlign={'center'}>
                            <Typography variant='h3' color='#fff'><a href="youtube.com"><i
                                className="fas fa-play "></i> What We Do</a></Typography>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box sx={{
                backgroundColor: '#E6E6E6',
                alignItems: 'center',
            }} height={'90vh'}>
                <Container>
                    <Typography textAlign={"center"} variant='h3' py={5} color='#333'> Tests</Typography>
                    <Box width={'100%'} sx={{
                        alignItems: 'center',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                        gap: 2,
                    }}>
                        {data.map((item, index) => (
                            <Card sx={{ minHeight: '400px',color:'#333' }}>
                                <CardContent key={index} sx={{ height: '100%' }}>
                                    <Typography variant="h4" >
                                        {item.type}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="h6">{item.level}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Typography variant="h4">
                                        1 hour
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Container>
                <Box sx={{textAlign:'center', paddingTop:'25px'}}><button  className='btn-main'>Start Tests</button></Box>
            </Box>
        </>
    )
}

export default Test