import './App.css'
import Login from './components/Login'
import { Notes } from './components/Notes'
import { ProtectedRoute } from './components/ProtectedRoute'
import SignUp from './components/SignUp'
import {BrowserRouter as Router,  Routes, Route } from "react-router-dom"

function App() {

  return (
    <Router>
      <Routes>
     <Route path='/' element={<SignUp/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route  path='/notes' 
      element={
        <ProtectedRoute>
          <Notes/>
        </ProtectedRoute>
      }
     />
      </Routes>
   
    </Router>
  )
}

export default App
