import { Footer, Navbar, Main, Whatwedo, Test, Teachers, Contact, Home, UserDetail, Tests, TestCard, TestDetail } from '../';
import { Box } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [reading, setReading] = useState([]);
  const [listening, setListening] = useState([]);
  const [writing, setWriting] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get("https://engly-backend.onrender.com/api/readings",)
      .then((res) => {
        setReading(res.data);
        console.log("Reading:", res.data);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      });
    // 
    axios
      .get("https://engly-backend.onrender.com/api/listening")
      .then((res) => {
        setListening(res.data);
        console.log("Listening:", res.data);
      })
      .catch((err) => {
        console.error("Listening xatolik:", err);
      });
    // 
    axios
      .get("https://engly-backend.onrender.com/api/writings")
      .then((res) => {
        setWriting(res.data);
        console.log("Writing:", res.data);
      })
      .catch((err) => {
        console.error("Listening xatolik:", err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/teachers/:id" element={<UserDetail />} />
      <Route path='/tests' element={<Tests />} />
      <Route path='/test/:id' element={<TestDetail reading={reading} listening={listening} writing={writing} />
    </Routes>
  )
}

export default App
