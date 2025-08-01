import { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const Listening = ({ disabled }) => {
    const [tests, setTests] = useState([]);
    const [selectedPart, setSelectedPart] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const fetchListening = async () => {
            try {
                const res = await axios.get("http://192.168.130.194:5000/api/listening");
                setTests(res.data[0].listening);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch listening data:", err);
            }
        };

        fetchListening();
    }, []);

    const handleAnswerChange = (questionNumber, value) => {
        setAnswers((prev) => ({
            ...prev,
            [selectedPart + "-" + questionNumber]: value,
        }));
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!tests.length) return <Typography>No listening data found</Typography>;

    const currentPart = tests[selectedPart];

    return (
        <Box py={1}>
            {/* Part tanlov tugmalari */}
            <Box display="flex" flexWrap="wrap" gap={1} my={1}>
                {tests.map((test, index) => (
                    <Button
                        key={index}
                        variant={selectedPart === index ? "contained" : "outlined"}
                        onClick={() => setSelectedPart(index)}
                        sx={{
                            color: selectedPart === index ? "white" : "#b90504",
                            borderColor: "#b90504",
                            backgroundColor: selectedPart === index ? "#b90504" : "transparent",
                            "&:hover": { backgroundColor: "#b90504", color: "white" },
                        }}
                    >
                        Part {test.part}
                    </Button>
                ))}
            </Box>
            <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                gap={2}
                height={isMobile ? "auto" : "70vh"}
            >
                <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
                    <Typography variant="h6">Transcript</Typography>
                    <Typography color="text.secondary" fontStyle="italic">
                        {currentPart?.transcript || "No transcript available"}
                    </Typography>
                    {currentPart?.audio && (
                        <Box mt={1}>
                            <audio controls src={currentPart?.audio} style={{ width: "100%" }} />
                        </Box>
                    )}
                </Paper>

                {/* Quiz */}
                <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Questions
                    </Typography>

                    {currentPart?.quiz?.length ? (
                        currentPart.quiz.map((section, secIdx) => (
                            <Box key={secIdx} mb={4}>
                                <Typography fontWeight="bold" gutterBottom>
                                    {section.title || section.count}
                                </Typography>
                                <Typography fontStyle="italic" mb={2}>
                                    {section.rule}
                                </Typography>

                                {section.questions.map((q) => (
                                    <Box key={q.number} mb={2}>
                                        <Typography fontWeight="bold">
                                            {q.number}. {q.question || q.label}
                                        </Typography>

                                        {"options" in q ? (
                                            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                                                {q.options.map((opt, i) => (
                                                    <Button
                                                        key={i}
                                                        variant={
                                                            answers[selectedPart + "-" + q.number] === opt
                                                                ? "contained"
                                                                : "outlined"
                                                        }
                                                        onClick={() => handleAnswerChange(q.number, opt)}
                                                        disabled={disabled}
                                                        sx={{
                                                            color:
                                                                answers[selectedPart + "-" + q.number] === opt
                                                                    ? "white"
                                                                    : "#b90504",
                                                            borderColor: "#b90504",
                                                            backgroundColor:
                                                                answers[selectedPart + "-" + q.number] === opt
                                                                    ? "#b90504"
                                                                    : "transparent",
                                                            "&:hover": {
                                                                backgroundColor: "#b90504",
                                                                color: "white",
                                                            },
                                                        }}
                                                    >
                                                        {opt}
                                                    </Button>
                                                ))}
                                            </Box>
                                        ) : (
                                            <TextField
                                                fullWidth
                                                value={answers[selectedPart + "-" + q.number] || ""}
                                                onChange={(e) =>
                                                    handleAnswerChange(q.number, e.target.value)
                                                }
                                                disabled={disabled}
                                                sx={{
                                                    mt: 1,
                                                    '& .MuiOutlinedInput-root': {
                                                        '&:hover fieldset': { borderColor: '#b90504' },
                                                        '&.Mui-focused fieldset': { borderColor: '#b90504' },
                                                    },
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        ))
                    ) : (
                        <Typography>No quiz available.</Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default Listening;
