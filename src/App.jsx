import Navbar from './components/Navbar/Navbar'
import HeroSlide from './components/HeroSlide/HeroSlide'
import './App.css'
import Wrapper from './components/Wrapper'
import ListMovie from './components/ListMovie/ListMovie'
import tmdbAPI from './services/tmdbAPI'
import Home from './pages/Home'


/* blur effect for lazy images */
import 'react-lazy-load-image-component/src/effects/blur.css';

/* 
Hook that caches the result of a calculation between re-renders, 
avoiding unnecessary expensive calculations when dependencies have not changed 
*/
import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import ListSearch from './pages/ListSearch/ListSearch'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>

      <Navbar className="py-3 w-100" />
      <Outlet />

    </>
  )
}

export default App
