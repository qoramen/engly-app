import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Main, Whatwedo, Test, Contact } from '../';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.88.225:5000/api/readings")
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
      <Main />
      <Whatwedo />
      <Test />
      <Contact />
      {/* <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/tests' element={<Tests />} />
        <Route path='/test/:id' element={<TestDeatil />} />
      </Routes> */}
      <Footer />
    </Box>
  )
}

export default App