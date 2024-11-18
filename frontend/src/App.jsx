import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSections from './components/SearchSections';
import RecommendationsPage from './pages/RecommendationsPage';
import HeroSection from './components/HeroSection';
import { SeedProvider } from './context/SeedContext';
import GuidePage from './pages/GuidePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <SeedProvider>
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
        </Routes>
      </SeedProvider>
    </BrowserRouter>
  );
}

export default App;







