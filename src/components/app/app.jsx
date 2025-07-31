import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar, Main, Whatwedo, Contact, Tests, TestCard, TestDetail } from '../';
import { Box } from '@mui/material';
const App = () => {
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
