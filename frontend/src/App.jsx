import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {BrowserRouter as Router,  Routes, Route } from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
     <Route path='/' element={<SignUp/>}/>
     <Route path='/login' element={<Login/>}/>
      </Routes>
   
    </Router>
  )
}

export default App
