import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchSections from './components/SearchSections';
import RecommendationsPage from './pages/RecommendationsPage';
import { SeedProvider } from './context/SeedContext';

function App() {
  return (
    <BrowserRouter>
      <SeedProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchSections />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
        </Routes>
      </SeedProvider>
    </BrowserRouter>
  );
}

export default App;







