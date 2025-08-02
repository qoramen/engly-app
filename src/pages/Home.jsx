import React from "react";
import { Box } from "@mui/material";
import { Test, Navbar, Main, Whatwedo, Contact, Footer } from "../components";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Main />
      <Whatwedo />
      <Test />
      <Contact />
      <Footer />
    </Box>
  );
};

export default Home