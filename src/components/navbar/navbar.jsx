import { Box, Container, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        setOpen(false);
        setPassword("");
        navigate("/teachers");
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#990100',
                    display: 'flex',
                    alignItems: 'center',
                }}
                position={'sticky'}
                height={'10vh'}
            >
                <Container>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                        {/* ✅ Link bilan o‘rash */}
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Typography variant='h3' fontSize={'6vh'} color='white'>
                                Engly
                            </Typography>
                        </Link>

                        <Box>
                            <Button
                                onClick={() => setOpen(true)}
                                sx={{ fontSize: '3vh', fontWeight: 200, color: 'white' }}
                            >
                                For Teachers
                            </Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* Modal */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Enter Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        fullWidth
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Enter</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Navbar;
