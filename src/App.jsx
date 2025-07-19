import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './view/home/home'
import Hadiah from './pages/Hadiah'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  if (!isMobile) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Tolong buka di perangkat mobile 📱</h2>
      </div>
    )
  }

  return (
    <Router>
      <div className='w-full min-h-screen bg-pink-200 p-3'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hadiah" element={<Hadiah />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
