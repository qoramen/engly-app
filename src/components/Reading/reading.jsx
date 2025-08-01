import { Box, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleViewer from "../article/article";

const Reading = ({ disabled, reading }) => {
  const [selectedPart, setSelectedPart] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [tests, setTests]= useState(reading?.[0]?.reading || [])


  useEffect(() => {
    if (reading && reading.length > 0 && reading[0].reading) {
      setTests(reading[0].reading);
      setLoading(false);
    }
  }, [reading]);

  const currentTest = tests[selectedPart] || {};
  const quiz = currentTest.quiz || [];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress sx={{ color: "#b90504" }} />
      </Box>
    );
  }

  if (tests.length === 0) {
    return (
      <Typography textAlign="center" mt={4}>
        No reading tests available.
      </Typography>
    );
  }

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
              backgroundColor: selectedPart === index ? "#b90504" : "transparent",
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
          <Typography variant="h6" gutterBottom>Reading Article</Typography>
          {typeof currentTest.article === 'string' && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {currentTest.article}
            </Typography>
          )}

          {typeof currentTest.article === 'object' &&
            (currentTest.article.title || currentTest.article.parts) && (
              <ArticleViewer article={currentTest.article} />
            )}

          {typeof currentTest.article === 'object' && currentTest.article.text && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 2 }}>
              {currentTest.article.text}
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 2, overflowY: "auto" }}>
          <Typography variant="h6" gutterBottom>Questions</Typography>

          {quiz.map((quizBlock, quizIndex) => (
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
