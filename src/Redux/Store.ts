
import { configureStore,createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import isPlainObject from "@reduxjs/toolkit";
import Message from "../Chat/Message";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../Firebase/Firebase";
// export const isPlain = (val:any) => {
//     return (
//         typeof val === 'undefined' ||
//     val === null ||
//     typeof val === 'string' ||
//     typeof val === 'boolean' ||
//     typeof val === 'number' ||
//     Array.isArray(val) ||
//     isPlainObject.applyMiddleware(val)
//     )
// }
interface userInterface {
    photoURL:string,
    uid:string,
    displayName:string
}

export const setCurrentChatMiddleware = createAsyncThunk('Chat slice',(ID:userInterface,thunkAPI) => {
    console.log('middleware worked');
    
    return ID
})


interface IChatSlice {
currentChat:undefined | userResultType,
concatID:string | undefined 

}

type userResultType = {
    displayName:string,
    uid:string,
    photoURL:string
}
const chatState:IChatSlice = {
currentChat:undefined,
concatID:undefined
}
export const chatSlice = createSlice({
    name:'Chat slice',
    initialState: chatState,
    reducers: {
        setCurrentChat:(state,action) => {
            state.currentChat = action.payload
           
        }
    },
    extraReducers:(builder) => {
        builder.addCase(setCurrentChatMiddleware.fulfilled,(state,action) => {
            console.log('extra reducer');
            
            state.currentChat = action.payload
            state.concatID = auth.currentUser?.uid as string > action.payload.uid ? auth.currentUser?.uid + action.payload.uid  : action.payload.uid + auth.currentUser?.uid as string
        })
    }
})


interface IMessagesState {
    messages:IMessage[]
}
const messagesState:IMessagesState = {
    messages:[]
}

export const messagesSlice = createSlice({
    name:'Messages',
    initialState:messagesState,
    reducers: {
        setMessages:(state,action) => {
            state.messages = action.payload
        }
    }
})



const store = configureStore({
    reducer: {
        chatReducer:chatSlice.reducer,
        messagesReducer:messagesSlice.reducer
    },
 
 
})

export default store
export const myDispatch:() => typeof store.dispatch = useDispatch

export type TState = ReturnType<typeof store.getState>