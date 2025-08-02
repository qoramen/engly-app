import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const ReadingTable = ({ data }) => (
  <Paper sx={{ p: 2 }}>
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

export default ReadingTable;
