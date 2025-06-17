import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.scss'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx'
import Three from './three/main.tsx'
import Graphics from './pages/graphics.tsx'
import './i18n';
import Langselect from './components/langselect.tsx';
import Toby from './components/toby.tsx';
//import Scroll from './utils/Scroll.tsx';
import Webdev from './pages/Webdev.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Router>
      <div className="border grid">
        <Toby />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/webdev" element={<Webdev />} />
        </Routes>
        <Langselect />
        <div className="fixborder item"></div>
      </div>
      <Three />
    </Router>
    <img className="noise" src="/img/noise.gif" alt="" />
  </StrictMode>
)