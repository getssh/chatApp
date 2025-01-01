import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleBg = fromMe ? 'bg-blue-500' : ""
  const formatedTime = extractTime(message.createdAt)

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            alt='Chat bubble'
            src={profilePic}
          />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBg} pb-1`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs text-white flex gap-1 items-center'>{formatedTime}</div>
    </div>
  )
}

export default Message