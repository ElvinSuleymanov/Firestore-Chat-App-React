/// <reference types="vite/client" />


declare interface IUserResult {
    photoURL:string,
    uid:string,
    displayName:string
}


declare interface IMessage {
    messageContent:string,
    senderID:string,
    messageDate:Date,
    messageID:number,
    senderName:string
}
