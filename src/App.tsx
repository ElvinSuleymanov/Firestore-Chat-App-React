import './App.css'
import {Helmet} from 'react-helmet'
import React, { useRef } from 'react'
import app from './Firebase/Firebase'
import { Link,Routes,Route, Navigate } from 'react-router-dom'
import { auth } from './Firebase/Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import firestore from 'firebase/firestore'
import Login from './Login/Login'
import Chat from './Chat/Chat'
import Register from './Register/Register'
import {Store } from './Context/context'
import  {useState} from 'react'
import ContextComp from './Context/context'


declare const user:string


import { useNavigate } from 'react-router-dom'
function App() {

  const myFunc = () => {
    
  }

  const navigate = useNavigate()
  interface children  {
    children:React.ReactNode
  }

  const ProtectedRoute = ({children}:children) => {
    if (auth.currentUser === null) {
      return (
        <Navigate to={'/'}></Navigate>
      )
    }
    else {
        return (
          children
        )
    }
  }
const [value,setValue] = useState()
const contextContent = {
  value,
  setValue
}
  
  return (
<ContextComp>
  <div className="App h-[100vh]">
      <Helmet>
        <title>Chat App</title>
      </Helmet>
<Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='register' element={<Register/>}></Route>
  <Route path='account' element={<ProtectedRoute><Chat></Chat></ProtectedRoute>}></Route>
</Routes>

      

  </div>     
</ContextComp>
  )
}

export default App
