import {
  Box,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import readingData from "../../data.json";
import { useState } from "react";

const Reading = ({ disabled }) => {
  const tests = readingData.reading;
  const [selectedPart, setSelectedPart] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentTest = tests[selectedPart];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Box py={1} sx={{ backgroundColor: "#f6f6f6" }}>
      <Box display="flex" gap={2} my={1}>
        {tests.map((test, index) => (
          <Button
            key={index}
            variant={selectedPart === index ? "contained" : "outlined"}
            onClick={() => setSelectedPart(index)}
            sx={{
              color: selectedPart === index ? "white" : "#b90504",
              borderColor: "#b90504",
              backgroundColor:
                selectedPart === index ? "#b90504" : "transparent",
              "&:hover": {
                backgroundColor: "#b90504",
                color: "white",
              },
            }}
          >
            Part {test.part}
          </Button>
        ))}
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3} height="70vh">
        <Paper sx={{ p: 2, overflowY: "auto" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h6">Reading Article</Typography>
          </Box>
          <Typography>{currentTest.article}</Typography>
        </Paper>

        <Paper sx={{ p: 2, overflowY: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>

          {currentTest.quiz.map((quizBlock, quizIndex) => (
            <Box key={quizIndex} mb={4}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {quizBlock.count}
              </Typography>

              {quizBlock.questions?.map((q, qIndex) => {
                const options = q.options || quizBlock.options;

                return (
                  <Box key={q.questionId} mb={3}>
                    <Typography variant="subtitle1" gutterBottom>
                      {q.questionId}. {q.question || q.text}
                    </Typography>

                    {options && options.length > 0 ? (
                      <FormControl fullWidth>
                        <InputLabel sx={{
                          color: "#333",
                          "&.Mui-focused": {
                            color: "#b90504",
                          },
                        }}>Select answer</InputLabel>
                        <Select
                          value={answers[q.questionId] || ""}
                          label="Select answer"
                          onChange={(e) => handleChange(q.questionId, e.target.value)}
                          disabled={disabled}
                          sx={{
                            color: "#333",
                            ".MuiOutlinedInput-notchedOutline": {
                              borderColor: "#b90504",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#b90504",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#b90504",
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                color: "#333",
                              },
                            },
                          }}
                        >
                          {options.map((opt, i) => (
                            <MenuItem key={i} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        placeholder="Type your answer"
                        value={answers[q.questionId] || ""}
                        onChange={(e) =>
                          handleChange(q.questionId, e.target.value)
                        }
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: '#b90504',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#b90504',
                            },
                          },
                        }}
                        disabled={disabled}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default Reading;
