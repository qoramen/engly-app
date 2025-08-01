import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Main, Whatwedo, Test, Contact } from '../';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [reading, setReading] = useState([]);
  const [listening, setListening] = useState([]);
  const [writing, setWriting] = useState([]);

  useEffect(() => {
    axios
      .get("https://engly-backend.onrender.com/api/readings",)
      .then((res) => {
        setReading(res.data[0]);
        console.log("Reading:", res.data[0]);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
    // 
    axios
      .get("https://engly-backend.onrender.com/api/listening")
      .then((res) => {
        setListening(res.data[0]);
        console.log("Listening:", res.data[0]);
      })
      .catch((err) => {
        console.error("Listening xatolik:", err);
      });
    // 
    axios
      .get("https://engly-backend.onrender.com/api/writings")
      .then((res) => {
        setWriting(res.data[0]);
        console.log("Writing:", res.data[0]);
      })
      .catch((err) => {
        console.error("Listening xatolik:", err);
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