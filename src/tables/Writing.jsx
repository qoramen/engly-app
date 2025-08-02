import { Paper, Typography, Box } from '@mui/material';

const WritingView = ({ data }) => (
  <Box>
    {data.map((task, idx) => (
      <Paper key={idx} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Task {task.task}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Word Count: {task.wordsCount}
        </Typography>
        <Typography variant="body1">{task.givenAnswer}</Typography>
      </Paper>
    ))}
  </Box>
);

export default WritingView;
