import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase/Firebase'
import {useRef} from 'react' 
import { useNavigate } from 'react-router-dom'
import { Toaster} from 'react-hot-toast'
import {toast} from 'react-hot-toast'




const Login = () => {
  
   const navigate = useNavigate()
   const emailInput = useRef<HTMLInputElement>(null)
   const passwordInput = useRef<HTMLInputElement>(null)
   const [error,setError] = useState(false)
const submitHandler = (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()
const email = emailInput.current?.value as string
const password = passwordInput.current?.value as string

signInWithEmailAndPassword(auth,email,password).then((data) => {
   console.log(data.user);
   
   navigate('account')
}).catch((err) => {
   toast.error(err.message)
})
}


return (
<>
  <div><Toaster></Toaster></div>
   <div className="login bg-[#A8BCFF] h-[100%] flex justify-center items-center">
         <div className="form_container px-[40px] bg-white w-[400px] h-[350px] rounded-[20px]">
            <h1 className='text-center text-[#625E79] text-[25px] font-[600] mt-[20px]'>Chat App</h1>
            <form onSubmit={submitHandler} action="" className='flex flex-col  gap-[20px]'>
               <input ref={emailInput} type="text" className='bg-transparent border-solid border-b-[1px] border-[#625E79] outline-none p-[10px]' placeholder='email'   />
               <input  ref={passwordInput}type="text" className='bg-transparent border-solid border-b-[1px] border-[#625E79] outline-none p-[10px]' placeholder='password' />
               <button className='bg-[#7B94EA] border-solid border-[1px] border-[#7B94EA] text-white hover:bg-white hover:text-[#7B94EA] p-[10px] transition-all duration-[.3s]'>Sign in</button>
            </form>
            <div className="navigate_register_page mt-[20px]">You don't have an account? <Link style={{textDecoration:'underline'}} to={'/register'}>Register</Link></div>
         </div>
   </div>
</>
)
}

export default Login