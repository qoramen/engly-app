import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from '@mui/material';

const ListeningTable = ({ data }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Listening Answers</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Question ID</TableCell>
            <TableCell>Given Answer</TableCell>
            <TableCell>Correct Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.questionId}</TableCell>
              <TableCell>{item.givenAnswer}</TableCell>
              <TableCell>{item.correct}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ListeningTable;
