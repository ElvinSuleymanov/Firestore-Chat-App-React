import { auth } from "../Firebase/Firebase"
import { chatSlice, messagesSlice, myDispatch } from "../Redux/Store"

import { updateDoc,setDoc,doc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../Firebase/Firebase"
import { getDocs,getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import type { TState } from "../Redux/Store"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentChatMiddleware } from "../Redux/Store"
import { serverTimestamp } from "firebase/firestore"
interface props {
    photoURL:string,
    uid:string,
    displayName:string
}
const Person = (props:props) => {

const state = useSelector((state:TState) => state)
const dispatch = myDispatch()
const ordinaryDispatch = useDispatch()


const setCurrentUser = async (e:React.MouseEvent) => {
    
    
        console.log(state.chatReducer.currentChat);
        
        await dispatch(setCurrentChatMiddleware(props))
    // dispatch(chatSlice.actions.setConcatID(auth.currentUser?.uid as string + state.chatReducer.currentChat?.uid as string))
    
    // if (state.chatReducer.currentChat?.uid) {
    //     console.log(123);
        
     
        const currentUserID = auth.currentUser?.uid as string
        // const collectionRef = collection(db,'userChats')
        const concatID = auth.currentUser?.uid as string > props.uid ? auth.currentUser?.uid + props.uid  : props.uid + auth.currentUser?.uid as string;
        const res = await getDoc(doc(db,"userChats",concatID))
        
        
        
        if (!res.exists()) {
            console.log('existt test');
            
            await setDoc(doc(db,"userChats",concatID),{messages:[]})
            
            await updateDoc(doc(db,"chats",auth.currentUser?.uid as string),{
                [concatID + ".userInfo"]: {
                    uid:state.chatReducer.currentChat?.uid,
                    displayName:state.chatReducer.currentChat?.displayName,
                    photoURL:state.chatReducer.currentChat?.photoURL
                },
                [concatID + ".date"]: {
                    timeStamp:serverTimestamp()
                }
            })
            
            
            await updateDoc(doc(db,"chats",state.chatReducer.currentChat?.uid as string),{
                [concatID + ".userInfo"]: {
                    uid:state.chatReducer.currentChat?.uid,
                    displayName:state.chatReducer.currentChat?.displayName,
                    photoURL:state.chatReducer.currentChat?.photoURL
                },
                [concatID + ".date"]: {
                    timeStamp:serverTimestamp()
                }
            })
        

            
        }
        
    // }
    
}
    
    
console.log(auth.currentUser?.displayName);



// useEffect(() => {
    
//         const unsub = onSnapshot(doc(db,"chats",auth.currentUser?.uid as string),(doc) => {
//            console.log(
//                Object.entries(
//                 ///@ts-ignore
//                 doc.data()
//            )[0][1]
           
//            );
            
//         })
        
     
//         return () => {
//             unsub()
//         }
// },[auth.currentUser?.uid])

    
    return (

        <div  onClick={setCurrentUser}  className="person rounded-[10px] h-[40px] flex items-center bg-[#5E5B91] cursor-pointer" key={props.uid}>

                <div key={props.uid} className="user_profile w-[40px] h-[40px] p-[5px]">
                    <img src={`${props.photoURL}`} alt="" className="h-[100%] w-[100%] " />
                </div>
                <div className="user_name text-white text-[21px]">
                    {props.displayName}
                </div>
        </div>
    )
}

export default Person