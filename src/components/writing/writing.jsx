import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Writing = ({ disabled }) => {
  const [selectedTask, setSelectedTask] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // API'dan writing testlarini olish
    const fetchWritingTests = async () => {
      try {
        const response = await axios.get("http://192.168.130.194:5000/api/writings"); 
        const apiData = response.data;

        if (apiData.length > 0 && apiData[0].writing) {
          setTests(apiData[0].writing);
        }
      } catch (err) {
        console.error("Error fetching writing tests:", err);
      }
    };

    fetchWritingTests();
  }, []);

  const handleAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [selectedTask]: value,
    }));
  };

  const currentTest = tests[selectedTask];

  return (
    <Box py={1}>
      {/* Top buttons */}
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

      {/* Prompt + Answer */}
      {currentTest && (
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          height={{ xs: "auto", md: "70vh" }}
        >
          {/* Prompt */}
          <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
            <Typography variant="h6" gutterBottom>Prompt</Typography>
            <Typography sx={{ mb: 1 }}>{currentTest.count}</Typography>
            <Typography sx={{ mb: 1 }}>{currentTest.time}</Typography>
            {currentTest.text && <Typography sx={{ mb: 1 }}>{currentTest.text}</Typography>}
            <Typography sx={{ mb: 1 }}>{currentTest.quiz}</Typography>
            {currentTest.text2 && <Typography sx={{ mb: 1 }}>{currentTest.text2}</Typography>}
            <Typography>{currentTest.words}</Typography>
          </Paper>

          {/* Answer */}
          <Paper sx={{ p: 2, flex: 1, overflowY: "auto" }}>
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
      )}
    </Box>
  );
};

export default Writing;
