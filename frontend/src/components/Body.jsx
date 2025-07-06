import Login from './Login'
import { Notes } from './Notes'
import { ProtectedRoute } from './ProtectedRoute'
import SignUp from './SignUp'
import {BrowserRouter as Router,  Routes, Route } from "react-router-dom"

export const Body = () => {
    return(
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