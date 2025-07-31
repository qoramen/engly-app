import { Box, Card, CardContent, Chip, Container, Grid, Modal, TextField, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import whatwedo from '../../whatwedo.json'
import { useState } from "react";



const Tests = () => {

  const testData = whatwedo.card
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState()
  //  const [cards, setCards] = useState<CardData[]>([]);
  // useEffect(() => {
  //   fetch('/data/cards.json')
  //     .then(res => res.json())
  //     .then(data => setCards(data.card))
  //     .catch(error => console.error("Error loading cards:", error));
  // }, []);


  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#e8e8e8 ',
    border: '1px solid #e8e8e8 ',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    color: '#333'
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
    setFormData({ firstName: '', lastName: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleStart = () => {
    if (!formData.firstName || !formData.lastName || !formData.password) {
      setState('Iltimos, barcha maydonlarni to‘ldiring.')
      setTimeout(() => setState(''), 2000);
      return;
    }

    navigate(`/test/${selectedCard.type.toLowerCase()}`, {
      state: { ...formData }
    });
  };


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
          <Typography variant="h3" align="center" gutterBottom>
            Tests
          </Typography>

          <Grid
            container
            spacing={4}
            justifyContent="center" // markazga joylashtiradi
          >
            {testData.map((card, index) => (
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
                  onClick={() => handleOpen(card)}
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
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            {selectedCard && (
              <>
                <Typography variant="h6" gutterBottom>
                  {selectedCard.title}
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#b90504',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#b90504',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#b90504',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#b90504',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#b90504',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#b90504',
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  sx={{
                    '& label.Mui-focused': {
                      color: '#b90504',
                    },
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#b90504',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#b90504',
                      },
                    },
                  }}
                />
                <Typography>{state}</Typography>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button onClick={handleClose} variant="outlined" color="error">
                    Cancel
                  </Button>
                  <Button onClick={handleStart} variant="contained" color="error">
                    Start Test
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default Tests