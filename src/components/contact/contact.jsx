import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

const Contact = () => {
    const telegramTokenBot = "BOT_TOKEN"
    const chatId = "CHAT_ID"

    const [status, setStatus] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("Please fill out the form");
            setTimeout(() => setStatus(""), 2500);
            return;
        }

        const message = `
            Yangi xabar:
            Ism: ${formData.name}
            Email: ${formData.email}
            Xabar: ${formData.message}
            `;

        try {
            await fetch(
                `https://api.telegram.org/bot${telegramTokenBot}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: chatId, text: message }),
                }
            );
            setStatus("Thanks for contacting with us");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Something went wrong");
        }

        setTimeout(() => setStatus(""), 2500);
    };

    return (
        <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    py={5}
                    color="#333"
                    textAlign="center"
                    fontWeight={600}
                >
                    Contact
                </Typography>

                <Box
                    display="flex"
                    flexDirection={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    gap={5}
                >
                    {/* Form Section */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Your Name"
                            name="name"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                "& label.Mui-focused": { color: "#b90504" },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": { borderColor: "#b90504" },
                                    "&.Mui-focused fieldset": { borderColor: "#b90504" },
                                },
                            }}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                "& label.Mui-focused": { color: "#b90504" },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": { borderColor: "#b90504" },
                                    "&.Mui-focused fieldset": { borderColor: "#b90504" },
                                },
                            }}
                        />

                        <TextField
                            label="Message"
                            name="message"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                "& label.Mui-focused": { color: "#b90504" },
                                "& .MuiOutlinedInput-root": {
                                    "&:hover fieldset": { borderColor: "#b90504" },
                                    "&.Mui-focused fieldset": { borderColor: "#b90504" },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: "#b90504",
                                "&:hover": { backgroundColor: "#8a0403" },
                            }} > Send Message </Button>
                        <Typography color="#b90504" fontSize={16}>
                            {status}
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: "100%", md: "45%" } }}>
                        <img
                            src="/image/contact.jpeg"
                            alt="Contact Visual"
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Contact;
