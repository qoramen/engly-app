import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Main, Whatwedo, Test, Contact } from '../';
import { Box } from '@mui/material';


const App = () => {
  return (
    <Box>
      <Navbar />
      <Main />
      <Whatwedo/>
      <Test/>
      <Contact/>
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