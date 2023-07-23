import React from 'react'
import { auth } from '../Firebase/Firebase'

type Props = {
  messageContent:string,
  messageDate:string | Date,
  messageSenderName:string
}

const Message = (props: Props) => {
  return (
    <div className={`message_element rounded-[12px] flex ${auth.currentUser?.displayName === props.messageSenderName ? 'justify-end' : 'justify-start'}`}>


        <div className="message_container relative  rounded-[12px] p-[10px] flex items-start bg-[#9792ed] ">

          <div className="name_content flex items-center flex-col">
            <div className="message_sender_name text-yellow-400 font-[600] text-[21px] max-[400px]:text-[18px]">
              <div className={`message_text ${props.messageSenderName === auth.currentUser?.displayName ? `text-right` : 'text-left'}`}>
                {props.messageSenderName}
              </div>
            </div>


            <div className="message_content text-white">
            <div className={`message_text ${props.messageSenderName === auth.currentUser?.displayName ? `text-right` : 'text-left'}`}>
                {props.messageContent}
              </div>
            </div>


          </div>
          <div className="message_sender_date text-white text-[10px]">
            {props.messageDate as string}
          </div>
        </div>
    </div>
  )
}

export default Message