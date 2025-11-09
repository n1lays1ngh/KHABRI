import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './Pages/LandingPage'
import ResultsPage from './Pages/ResultsPage'

// 1. Import the provider
import { NewsProvider } from './context/NewsContext'

function App() {
  return (
    
    <NewsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </NewsProvider>
  )
}

export default App