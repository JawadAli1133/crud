import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignupForm from './Components/Signup';
import SignInForm from './Components/SignIn';
import ProductPage from './Components/Products';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
      <Router>
        {/* <Toaster></Toaster> */}
        <Routes>
          <Route path='/signup' element={<SignupForm/>}></Route>
          <Route path='/signin' element={<SignInForm/>}></Route>
          <Route path='/' element={<ProductPage/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
