import { Box, Container, Grid, Typography } from '@mui/material'
import whatwedo from '../../whatwedo.json'
const Whatwedo = () => {

    const data = whatwedo.section
    return (
        <Box sx={{
            backgroundColor: '#f6f6f6',
            display: 'flex',
            alignItems: 'center',
        }}
            height={'80vh'}
        >
            <Box height={'100%'} width={'100%'} sx={{
                display: 'flex',
                paddingTop: '100px'
            }}>
                <Container>
                    <Box textAlign={'center'}>
                        <Typography variant='h3' mb={1} color='#333333'>{data.title}</Typography>
                        <Typography variant='body1' mb={8} color='#333333' sx={{ fontSize: '20px', }}>{data.subtitle}</Typography>
                        <Grid  container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                            {data.services.map((item, idx) => {
                                return (
                                    <Grid key={idx} size={6}>
                                        <Grid container spacing={2}>
                                            <Grid size={{xs:2 }}>
                                                <i style={{color:'#333'}} className={`${item.icon} fa-3x`}></i>
                                            </Grid>
                                            <Grid size={{ xs:10 }}>
                                                <Typography variant='h6' mb={1} color='#333333' sx={{textAlign:'start' }}>{item.description}</Typography>
                                                <Typography variant='body1' mb={2} color='#333333' sx={{textAlign:'start' }}>{item.title}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}

export default Whatwedo