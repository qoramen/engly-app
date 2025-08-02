import React, { useEffect, useState } from 'react';
import {
    Box, Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Paper
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ListeningTable, ReadingTable, WritingView, Navbar, Footer } from "../components";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [section, setSection] = useState("reading");

    useEffect(() => {
        axios.get(`https://engly-backend.onrender.com/api/user-test-results/${id}`)
            .then(res => setUser(res.data));
    }, [id]);

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Navbar />
            <Box sx={{ height: '80vh' }}>
                <Container sx={{ pt: 4 }}>
                    <Grid container spacing={3}>
                        {/* Chap tomon – user info */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h6">Firstname: {user.firstname}</Typography>
                                <Typography variant="h6">Lastname: {user.lastname}</Typography>
                                <Typography variant="body1">ID: {user._id}</Typography>
                                <FormControl fullWidth sx={{ mt: 4 }}>
                                    <InputLabel>Section</InputLabel>
                                    <Select
                                        value={section}
                                        onChange={(e) => setSection(e.target.value)}
                                        label="Section"
                                    >
                                        <MenuItem value="reading">Reading</MenuItem>
                                        <MenuItem value="listening">Listening</MenuItem>
                                        <MenuItem value="writing">Writing</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>

                        {/* O'ng tomon – testlar */}
                        <Grid item xs={12} md={8}>
                            {section === "reading" && <ReadingTable data={user.reading} />}
                            {section === "listening" && <ListeningTable data={user.listening} />}
                            {section === "writing" && <WritingView data={user.writing} />}
                        </Grid>
                    </Grid>

                </Container>
            </Box>
            <Footer />
        </Box >
    );
};

export default UserDetail;
