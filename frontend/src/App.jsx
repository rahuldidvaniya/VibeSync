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

function App() {
  return (
    <BrowserRouter>
      <SeedProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        <Navbar />
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
    </BrowserRouter>
  );
}

export default App;







