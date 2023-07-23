import { Link } from "react-router-dom"
import {useRef, useState} from 'react'
import React from 'react'
import { User, createUserWithEmailAndPassword } from "firebase/auth"
import { auth ,db, firestore} from "../Firebase/Firebase"
import app from "../Firebase/Firebase"
import { getAuth } from "firebase/auth";
import { setDoc,doc ,collection, addDoc,getFirestore, query, getDocs} from "firebase/firestore"
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { UserCredential } from "firebase/auth"
import { storage } from "../Firebase/Firebase"
import { toast } from "react-hot-toast"
import { Toaster } from "react-hot-toast"

import DefaultProfile from '../assets/Default_pfp.svg.png'
const Register = () =>  {
   const firebaseConfig = {
      apiKey: "AIzaSyC_ouxh520pRxwCbzn7Ed3u3d9N5YxzFY0",
      authDomain: "authentication-test-8dd29.firebaseapp.com",
      databaseURL: "https://authentication-test-8dd29-default-rtdb.firebaseio.com",
      projectId: "authentication-test-8dd29",
      storageBucket: "authentication-test-8dd29.appspot.com",
      messagingSenderId: "842134803949",
      appId: "1:842134803949:web:39bef99a44499f88cd03e4"
    };
    
    
    const displayNameInput = useRef<HTMLInputElement>(null)
    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)
    const profilePicture = useRef<HTMLInputElement>(null)
    const [uservariable,setUservariable] = useState<User>()
    // const [failed,setFailed] = useState<Boolean>(false)
    
    
  
    
    const navigate = useNavigate()
    const addAccount = async (e:React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
      let failed = false
       e.preventDefault()
       
       
       
       
       
       const email = emailInput.current?.value as string
       const password = passwordInput.current?.value as string
       const pp = profilePicture.current?.files as FileList
       const displayName = displayNameInput.current?.value as string
       
       
         const storageRef = ref(storage,displayName)

        const collectionRef = collection(db,'users')
        const queryRef = query(collectionRef)
        const snapshot = await getDocs(queryRef)



        
      snapshot.forEach((el) => {
        if (el.data().displayName === displayName) {
          toast.error('Username already in use')
         failed = true
        }
        
      })


      if (!failed) {
         
      
      
       const uploadTask = uploadBytesResumable(storageRef, pp[0])
      try {
        
         const user = await  createUserWithEmailAndPassword(auth,email,password)
        


          uploadTask.on('state_changed', 
            (snapshot) => {
               
            }, 
            (error) => {
               toast.error(error.message)
            }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(user.user,{displayName:displayName,photoURL:downloadURL})
                await setDoc(doc(db,'users',user.user.uid),{displayName:displayName,uid:user.user.uid,photoURL:downloadURL})
                await setDoc(doc(db,'chats',user.user.uid),{})
                navigate('/')
              })
            }
          );
      }
      catch(err:any) {
         toast.error(err.message)
      }

      }
    }
    return (
      <>
      <div><Toaster position="top-right"></Toaster></div>
        <div className="login bg-[#A8BCFF] h-[100%] flex justify-center items-center">
        <div className="form_container px-[40px]  bg-white w-[400px] h-[410px] rounded-[20px]">
           <h1 className='text-center text-[#625E79] text-[25px] font-[600] mt-[20px]'>Chat App</h1>
           <form action="" onSubmit={addAccount} className='flex flex-col  gap-[20px]'>
              <input ref={displayNameInput} type="text" className='bg-transparent border-solid border-b-[1px] border-[#625E79] outline-none p-[10px]' placeholder='display name'   />
              <input ref={emailInput} type="text" className='bg-transparent border-solid border-b-[1px] border-[#625E79] outline-none p-[10px]' placeholder='email'   />
              <input ref={passwordInput} type="text" className='bg-transparent border-solid border-b-[1px] border-[#625E79] outline-none p-[10px]' placeholder='password' />
              <input ref={profilePicture} accept="image/png,image/jpeg" type="file" style={{display:'none'}} id="file_input"/>
              <label htmlFor="file_input" >Upload Your Picture</label>
              <button onClick={addAccount} className='bg-[#7B94EA] border-solid border-[1px] border-[#7B94EA] text-white hover:bg-white hover:text-[#7B94EA] p-[10px] transition-all duration-[.3s]'>Sign in</button>

           </form>
        </div>
  </div>
      
      </>
)
    
}

export default Register