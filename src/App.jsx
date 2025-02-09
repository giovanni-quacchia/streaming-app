import Navbar from './components/Navbar/Navbar'
import './App.css'


/* blur effect for lazy images */
import 'react-lazy-load-image-component/src/effects/blur.css';

/* 
Hook that caches the result of a calculation between re-renders, 
avoiding unnecessary expensive calculations when dependencies have not changed 
*/
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
