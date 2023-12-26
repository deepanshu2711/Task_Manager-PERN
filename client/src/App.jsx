import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Signin from './pages/SignIn.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'




function App() {
  

  return (
    <div>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<SignUp/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route element ={<PrivateRoute/>}>
      <Route path="/home" element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      </Route>
      
    </Routes>
      
    </BrowserRouter>
      
    </div>
  )
}

export default App
