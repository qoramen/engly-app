import { Box, Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material"
import whatwedo from '../../whatwedo.json'
import { useNavigate } from "react-router-dom"

const TestCard = () => {
    const data = whatwedo.card
    const navigate = useNavigate()
    // const handleCardClick = (type) => {
    //     navigate(`/test/${type.toLowerCase()}`);
    // };
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
                backgroundColor: '#f6f6f6',
                alignItems: 'center',
            }} height={'90vh'}>
                <Container>
                    <Typography textAlign={"center"} variant='h3' py={8} color='#333'> Tests</Typography>
                    <Grid
                        container
                        spacing={4}
                        justifyContent="center"
                    >
                        {data.map((card, index) => (
                            <Grid item key={index}>
                                <Card
                                    sx={{
                                        backgroundColor: "#e8e8e8 ",
                                        borderRadius: 2,
                                        height: '100%',
                                        color: "#333",
                                        width: '35vh',
                                        cursor: "pointer",
                                        '&:hover': {
                                            boxShadow: 6,
                                        }
                                    }}
                                // onClick={() => handleCardClick(card.type)}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                            {card.type}
                                        </Typography>
                                        <Chip label={card.level} sx={{
                                            backgroundColor: '#b90504',
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }} size="small" />
                                        <Typography variant="body2" sx={{ my: 2 }}>
                                            {card.description}
                                        </Typography>
                                        <Typography variant="caption" color="gray">
                                            <i className="far fa-clock"></i> Duration: {card.duration} minutes
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Box sx={{ textAlign: 'center', paddingTop: '50px' }}><button onClick={() => navigate('/tests')} className='btn-main'>Start Tests</button></Box>
            </Box>
        </>
    )
}

export default TestCard