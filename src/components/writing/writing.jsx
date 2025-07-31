import { Box, Button, Typography, Paper, TextField} from "@mui/material";
import writingData from "../../writing.json";
import { useState } from "react";

const Writing = ({disabled}) => {
    const [selectedTask, setSelectedTask] = useState(0);
    const [answers, setAnswers] = useState({});


    const tests = writingData.tests;
    const currentTest = tests[selectedTask];

    const handleAnswerChange = (value) => {
        setAnswers(prev => ({
            ...prev,
            [selectedTask]: value
        }));
    };

    return (
        <Box py={1}>
            <Box display="flex" gap={2} my={1}>
                {tests.map((test, index) => (
                    <Button
                        key={index}
                        variant={selectedTask === index ? "contained" : "outlined"}
                        onClick={() => setSelectedTask(index)}
                        sx={{
                            color: selectedTask === index ? "white" : "#b90504",
                            borderColor: "#b90504",
                            backgroundColor: selectedTask === index ? "#b90504" : "transparent",
                            "&:hover": { backgroundColor: "#b90504", color: "white" }
                        }}
                    >
                        Task {test.task}
                    </Button>
                ))}
            </Box>
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} height="70vh">
                <Paper sx={{ p: 2, overflowY: "auto" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6"> Prompt</Typography>
                    </Box>
                        <Typography>{currentTest.prompt}</Typography>
                </Paper>

                <Paper sx={{ p: 2, overflowY: "auto" }}>
                    <Typography variant="h6" gutterBottom>Your Answer</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={18}
                        value={answers[selectedTask] || ""}
                        onChange={(e) => handleAnswerChange(e.target.value)}
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
                </Paper>
            </Box>
        </Box>
    );
};

export default Writing;
