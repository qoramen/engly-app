import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer, UserDetails } from "../components";
import { Box, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://engly-backend.onrender.com/api/user-test-results")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <Box>
            <Navbar />
            <Box sx={{ height: '80vh' }}>
                <Container sx={{ pt: 4 }}>
                    <Typography variant="h4" gutterBottom>All Users</Typography>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Firstname</TableCell>
                                    <TableCell>Lastname</TableCell>
                                    <TableCell>ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow
                                        key={user._id}
                                        hover
                                        onClick={() => navigate(`/teachers/${user._id}`)}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell>{user.firstname}</TableCell>
                                        <TableCell>{user.lastname}</TableCell>
                                        <TableCell>{user._id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Teachers;
