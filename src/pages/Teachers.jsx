import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Footer } from "../components";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Teachers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.100.185:5000/api/users")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <Box>
            <Navbar />
            <Box sx={{ height: '80vh' }}>
                <Container sx={{pt: 4}}>
                    <Typography variant="h4" gutterBottom>
                        <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        All Users
                    </Typography>
                    <Grid container spacing={3}>
                        {users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{user.firstname} {user.lastname}</Typography>
                                        <Typography color="text.secondary">ID: {user._id}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default Teachers;
