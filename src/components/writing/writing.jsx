import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";

const Writing = ({ disabled, writing }) => {
  const [selectedTask, setSelectedTask] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentTest = tests[selectedTask];
  const currentAnswer = answers[selectedTask] || "";

  useEffect(() => {
    if (writing && writing.length > 0 && writing[0].writing) {
      setTests(writing[0].writing);
      setLoading(false);
    }
  }, [writing]);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [selectedTask]: value,
    }));
  };

  //  So'z va jumla sanovchi funksiya
  const countWords = (text) =>
    text.trim().split(/\s+/).filter((word) => word.length > 0).length;

  const countSentences = (text) =>
    text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0).length;

  const wordCount = countWords(currentAnswer);
  const sentenceCount = countSentences(currentAnswer);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress sx={{ color: "#b90504" }} />
      </Box>
    );
  }

  return (
    <Box py={1}>
      <Box display="flex" flexWrap="wrap" gap={2} my={1}>
        {tests.map((test, index) => (
          <Button
            key={index}
            variant={selectedTask === index ? "contained" : "outlined"}
            onClick={() => setSelectedTask(index)}
            sx={{
              color: selectedTask === index ? "white" : "#b90504",
              borderColor: "#b90504",
              backgroundColor: selectedTask === index ? "#b90504" : "transparent",
              "&:hover": { backgroundColor: "#b90504", color: "white" },
            }}
          >
            Task {test.task}
          </Button>
        ))}
      </Box>

      {currentTest && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          height={{ xs: "auto", md: "70vh" }}
        >
          <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>Prompt</Typography>
            <Typography sx={{ mb: 1 }}>{currentTest.count}</Typography>
            <Typography sx={{ mb: 1 }}>{currentTest.time}</Typography>
            {currentTest.text && <Typography sx={{ mb: 1 }}>{currentTest.text}</Typography>}
            <Typography sx={{ mb: 1 }}>{currentTest.quiz}</Typography>
            {currentTest.text2 && <Typography sx={{ mb: 1 }}>{currentTest.text2}</Typography>}
            <Typography>{currentTest.words}</Typography>
            {selectedTask === 0 && (
              <Box mt={2}>
                <img
                  src="/image/writing-task-1.png"
                  alt="Part 2 map"
                  style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: 8 }}
                />
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>Your Answer</Typography>


            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Words: {wordCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sentences: {sentenceCount}
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={18}
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={disabled}
              sx={{
                '& label.Mui-focused': { color: '#b90504' },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#b90504' },
                  '&.Mui-focused fieldset': { borderColor: '#b90504' },
                },
              }}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default Writing;
