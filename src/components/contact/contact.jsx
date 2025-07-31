import { Box, Container, TextField, Typography } from "@mui/material"
import { useState } from "react"

const Contact = () => {
    const telegramTokenBot = "BOT_TOKEN"
    const chatId = 'CHAT_ID'

    const [status, setStatus] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill out the form');
            setTimeout(() => setStatus(''), 2500);
            return;
        }

        const message = `
Yangi xabar:
Ism: ${formData.name}
Email: ${formData.email}
Xabar: ${formData.message}
`

        try {
            await fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            })
            setStatus('Thanks for contacting with us');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('Something went wrong');
        }

        setTimeout(() => setStatus(''), 2500);
    }

    return (
        <Box sx={{ backgroundColor: '#fff' }} height={'100vh'}>
            <Container>
                <Typography variant='h3' py={5} color='#333' textAlign="center">Contact</Typography>
                <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" gap={5}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            maxWidth: 500,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Your Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            sx={{
                                '& label.Mui-focused': { color: '#b90504', },
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#b90504' },
                                    '&.Mui-focused fieldset': { borderColor: '#b90504' },
                                },
                            }}
                        />

                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                '& label.Mui-focused': { color: '#b90504' },
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#b90504' },
                                    '&.Mui-focused fieldset': { borderColor: '#b90504' },
                                },
                            }}
                        />

                        <TextField
                            label="Message"
                            variant="outlined"
                            name="message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            sx={{
                                '& label.Mui-focused': { color: '#b90504' },
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#b90504' },
                                    '&.Mui-focused fieldset': { borderColor: '#b90504' },
                                },
                            }}
                        />

                        <button type="submit" className="btn-main">Send Message</button>
                        <Typography variant="h6">{status}</Typography>
                    </Box>

                    
                    <Box sx={{ maxWidth: 500, width: '100%' }}>
                        <img
                            src="/image/contact.jpeg"
                            alt="Mock Test Visual"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                    </Box>

                </Box>
            </Container>
        </Box>
    )
}

export default Contact
