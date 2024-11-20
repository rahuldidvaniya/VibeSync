import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSections from './components/SearchSections';
import RecommendationsPage from './pages/RecommendationsPage';
import HeroSection from './components/HeroSection';
import { SeedProvider } from './context/SeedContext';
import GuidePage from './pages/GuidePage';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import ConnectPage from './pages/ConnectPage';
import { Box, styled } from '@mui/material';
import Footer from './components/Footer';

const AppContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Navbar />
        <Box sx={{ flex: 1 }}>
          <SeedProvider>
            <ScrollToTop />
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <SearchSections />
                </>
              } />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/connect" element={<ConnectPage />} />
            </Routes>
          </SeedProvider>
        </Box>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;







