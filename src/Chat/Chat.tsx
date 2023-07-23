import React, { HTMLInputTypeAttribute } from 'react'
import { auth } from '../Firebase/Firebase'
import { addDoc, collection, getFirestore, query, serverTimestamp, where ,doc, getDocs, setDoc, updateDoc, onSnapshot, arrayUnion, increment} from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import {useRef} from 'react'
import {useContext} from 'react'
import Message from './Message'
import {useState,useEffect} from 'react'
import { Store } from '../Context/context'
import { getDoc } from 'firebase/firestore'
import Person from './Person'
import { db } from '../Firebase/Firebase'
import { DocumentData } from '@firebase/firestore-types'
import { useSelector } from 'react-redux/es/exports'
import './Style.scss'
import { TState, chatSlice, messagesSlice, myDispatch } from '../Redux/Store'
import { current } from '@reduxjs/toolkit'
import { CompleteFn } from 'firebase/auth'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import { Await } from 'react-router-dom'

import DefaultPhoto from '../assets/Default_pfp.svg.png'
const Chat = () => {

    const dispatch = myDispatch()
    const Context = useContext(Store)
    const messageInput = useRef<HTMLInputElement>(null)
    const messagesRef = collection(firestore,'messages')
    const messageInputRef = useRef<HTMLInputElement>(null)

    const chatContainerRef = useRef<HTMLDivElement>(null)

    const messageSendRef = useRef<HTMLInputElement>(null)

    const [targetAcc,setTargetAcc] = useState<string>('')
    const [usersResult,setUsersResult] = useState<IUserResult[] | DocumentData[]>([])
    const state = useSelector((state:TState) => state)

    const searchForUser = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       
    }

    const [inputValue,setInputValue] = useState<string>('')
    const KeyUpHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
       setInputValue(
           e.currentTarget.value
       )
       
    }



    const inputEventHandler = async (e:React.KeyboardEvent<HTMLInputElement>) => {
           
            const targetAcc = messageInputRef.current?.value as string
            if (e.currentTarget.value === '') {
                setUsersResult([])
                return
            }
            const collectionRef = collection(db,'users')
            const q = query(collectionRef,where("displayName","==",targetAcc))

            
            const querySnapShot = await getDocs(q)
             querySnapShot.forEach((result) => {
                const userObj = (result.id ,"=>",result.data())
                
                if (userObj.uid === auth.currentUser?.uid) return
                if ((usersResult as DocumentData[]).find((user) => user.uid === userObj.uid)) return

                 setUsersResult([...usersResult,userObj])
                console.log(usersResult);
                
                
            })            
    }






 

   useEffect(() => {
        console.log(state.chatReducer.concatID);
       if (state.chatReducer.concatID !== undefined) {
        
        const unsub = onSnapshot(doc(db,'userChats',state.chatReducer.concatID as string),(doc) => {
            console.log(doc.data());
            dispatch(messagesSlice.actions.setMessages(doc.data()?.messages))
        },(err) => {
            toast.error(err.message)
        },() => {
            console.log('completed');
            
        })
        return () => unsub()
           
    }

    chatContainerRef.current?.scrollTo({
        behavior:'smooth',
        top: chatContainerRef.current?.scrollHeight as number - (chatContainerRef.current?.clientHeight as number)
    })


   },[state.messagesReducer.messages?.length])


   useEffect(() => {
    if (state.chatReducer.concatID !== undefined) {
        
        const unsub = onSnapshot(doc(db,'userChats',state.chatReducer.concatID as string),(doc) => {
            console.log(doc.data());
            dispatch(messagesSlice.actions.setMessages(doc.data()?.messages))
        },(err) => {
            toast.error(err.message)
        },() => {
            console.log('completed');
            
        })

    }
   },[state.chatReducer.currentChat?.uid])
 

        chatContainerRef.current?.scrollTo({
            behavior:'smooth',
            top: chatContainerRef.current?.scrollHeight as number - (chatContainerRef.current?.clientHeight as number)
        })
    


   const sendHandler = async () => {

    await updateDoc(doc(db,'userChats',state.chatReducer.concatID as string),{
        messages:arrayUnion({
            
            messageContent:messageSendRef.current?.value,
            senderID:auth.currentUser?.uid,
            messageDate:new Date().getHours().toString().padStart(2) + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            messageID:Math.random(),
            senderName:auth.currentUser?.displayName
        
        })
    })

        chatContainerRef.current?.scrollTo({
            behavior:'smooth',
            top: chatContainerRef.current?.scrollHeight as number - (chatContainerRef.current?.clientHeight as number)
        })

    setInputValue('')        

   }
  
   

   

    


    return (
        <>
        <Toaster></Toaster>
        <div className='bg-[#A8BCFF] h-[100vh] flex justify-center items-center'>

            <div className="chat_container   rounded-[20px] bg-white  m-auto ">
            <div className="top_container border-solid h-[40px] rounded-t-[20px] flex items-center pl-[20px] bg-[#3E3C62] text-white border-[#A8BCFF]">
                Welcome {auth.currentUser?.displayName as string}
                   <div className="user_profile w-[30px] h-[30px] ml-[20px] rounded-[50%]"><img  className=' rounded-[50%] w-[30px] h-[30px]' src={`${auth.currentUser?.photoURL ? auth.currentUser.photoURL : DefaultPhoto}`} alt="" />
                   </div>
                </div>
                <form action='' onSubmit={searchForUser} className="search_bar flex items-center gap-[20px]  p-[6px] bg-[#5E5B91] ">
                 <input ref={messageInputRef} onKeyUp={(e) => inputEventHandler(e)}  type="text" className=' bg-[#A8BCFF]  w-[200px] max-[400px]:w-[130px] max-[400px]:p-[6px] rounded-[5px] p-[10px]  text-[#3E3C62] placeholder:text-[#3E3C62] outline-none select-none' placeholder='Search For User' />

                 {
                     state.chatReducer.currentChat &&
                     <div className="current_target_user_chat flex items-center gap-[9px]">
                        <div className="current_target_user_profile">
                            <img  className='w-[50px] h-[50px] rounded-[50%] object-cover' src={state.chatReducer.currentChat.photoURL} alt="" />
                        </div>
                        <div className="current_target_user_name text-white text-[23px]">
                            {
                                state.chatReducer.currentChat.displayName
                            }
                        </div>
                    </div>
                 }
                </form>
               
                
            <div className="bottom_container   flex h-[460px] ">
                <aside className=' bg-[#3E3C62] w-[200px] max-[700px]:w-[160px] max-[510px]:w-[140px] max-[400px]:w-[120px] p-[10px] flex flex-col gap-[20px]  rounded-bl-[20px]'>
                    {
                        usersResult.map((res) => {
                            return (
                                <Person photoURL={res.photoURL} uid={res.uid} displayName={res.displayName}></Person>
                            )
                        })
                    }
                </aside>
                <div className="chat_container  flex-[2]  w-[500px] max-[721px]:w-[430px] max-[610px]:w-[360px] max-[535px]:w-[320px] max-[502px]:w-[290px] max-[450px]:w-[250px] max-[410px]:w-[230px] relative  ">
                    <div  ref={chatContainerRef} className="chat_messages bg-gray-400 flex flex-col  h-[460px] p-[20px] gap-[20px] pb-[35px]">
                        {
                            state.messagesReducer.messages ? state.messagesReducer.messages.map((mes:IMessage) => {
                                return (
                                        <Message messageContent={mes.messageContent} messageDate={mes.messageDate} messageSenderName={mes.senderName}></Message>
                                )
                            })
                            : <div className='text-[25px] text-center text-white'>You Dont Have Messages Yet</div>
                        }
                       
                     
                    </div>
                    <div className="chat_input flex rounded-[20px] absolute bottom-0 right-0 left-0">
                        <input value={inputValue} onChange={(e) => KeyUpHandler(e)} ref={messageSendRef} type="text" className='w-[100%] outline-none pl-[10px] h-[35px] rounded-t-[20px] rounded-br-[20px]' placeholder='Type something...' />
                        <button onClick={sendHandler} className='bg-purple-800 text-white w-[70px] rounded-tl-[20px]'>Send</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
                            </>
    )
}



export default Chat