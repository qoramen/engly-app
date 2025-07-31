import { Box, Button, Typography, Paper, TextField} from "@mui/material";
import listeningData from "../../listening.json";
import { useState } from "react";

const Listening = ({disabled}) => {
    const [selectedPart, setSelectedPart] = useState(0);
    const [answers, setAnswers] = useState({});

    const tests = listeningData.tests;
    const currentTest = tests[selectedPart];

    const handleAnswerChange = (questionIndex, value) => {
        setAnswers(prev => ({
            ...prev,
            [selectedPart + "-" + questionIndex]: value
        }));
    };

    return (
        <Box py={1}>
            <Box display="flex" gap={2} my={1}>
                {tests.map((test, index) => (
                    <Button
                        key={index}
                        variant={selectedPart === index ? "contained" : "outlined"}
                        onClick={() => setSelectedPart(index)}
                        sx={{
                            color: selectedPart === index ? "white" : "#b90504",
                            borderColor: "#b90504",
                            backgroundColor: selectedPart === index ? "#b90504" : "transparent",
                            "&:hover": { backgroundColor: "#b90504", color: "white" }
                        }}
                    >
                        Part {test.part}
                    </Button>
                ))}
            </Box>

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} height="70vh">
                <Paper sx={{ p: 2, overflowY: "auto" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6">Transcript</Typography>
                    </Box>
                        <Typography>{currentTest.transcript}</Typography>
                </Paper>

                <Paper sx={{ p: 2, overflowY: "auto" }}>
                    <Typography variant="h6" gutterBottom>Questions</Typography>
                    {currentTest.questions.map((q, idx) => (
                        <Box key={idx} mb={3}>
                            <Typography fontWeight="bold">{idx + 1}. {q.question}</Typography>
                            <TextField
                                fullWidth
                                value={answers[selectedPart + "-" + idx] || ""}
                                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                                disabled={disabled}
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
                        </Box>
                    ))}
                </Paper>
            </Box>
        </Box>
    );
};

export default Listening;
