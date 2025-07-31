import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Main, Whatwedo, Contact, Tests, TestCard, TestDetail } from '../';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios
      .get("http://192.168.130.194:5000/api/readings")
      .then((res) => {
        setTasks(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
  }, []);
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route path='/' element={
          <>
            <Main />
            <Whatwedo />
            <TestCard />
            <Contact />
          </>
        } />
        <Route path='/tests' element={<Tests />} />
        <Route path='/test/:id' element={<TestDetail />} />
      </Routes>

      <Footer />
    </Box>
  )
}

export default App
