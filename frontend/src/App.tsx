import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSections from './components/SearchSections';
import RecommendationsPage from './pages/RecommendationsPage';
import HeroSection from './components/HeroSection';
import { SeedProvider } from './context/SeedContext';
import GuidePage from './pages/GuidePage';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import { Box, styled } from '@mui/material';
import Footer from './components/Footer';

const AppContainer = styled(Box)<{ component?: React.ElementType }>({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

function App(): JSX.Element {
  return (
    <AppContainer component="div">
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
          </Routes>
        </SeedProvider>
      </Box>
      <Footer />
    </AppContainer>
  );
}

export default App;







