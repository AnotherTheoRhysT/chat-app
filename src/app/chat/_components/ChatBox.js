import React, { useContext, useEffect, useRef, useState } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AuthContext } from '@/components/providers/AuthProvider'

import axios from 'axios'
import SendMessageButton from './SendMessageButton'


// const FormSchema = z.object({
//   message: z.string()
// }).required()

const ChatBox = ({lastMessageId, messages, setMessages, convoId}) => {
	// const form = useForm({
  //   resolver: zodResolver(FormSchema),
  // })

	// const onSubmit = (formData) => {
	// 	console.log(formData.message)
	// 	formData.message = ""
	// }
	const [auth, setAuth] = useContext(AuthContext)
	const [sendingMessage, setSendingMessage] = useState(false)
	// console.log('auth', auth)

	const messageRef = useRef(null);

	useEffect(() => {
		messageRef.current.focus()
	}, [])

	const handleSendMessage = () => {
		setSendingMessage(true)

		console.log(messageRef.current.value)
		const now = new Date();
		const newMessage = {
			conversation_id: convoId,
			deleted_at: null,
			id: `${convoId}${lastMessageId + 1}`*1,	// Might cause race condition, but I think it's unlikely
			message_text: messageRef.current.value,
			sent_timestamp: now.toISOString(),
			user: auth,
			user_id: auth.id,
		}
		console.log(newMessage)

		setMessages([...messages, newMessage])

		setSendingMessage(false)
		messageRef.current.value = ''

		// axios.post(`${process.env.SERVER_URL}/api/chat/message/send`, {
			// conversation_id: convoId,
			// message_text: messageRef.current.value
		// })
		// .then(res => {
			// console.log("Sent", res)
			// messageRef.current.value = ''
		// })
		// .catch(err => {
			// console.log("Message send error", err)
		// })
	}

	return (
		<div className='relative bottom-0 right-0 w-full p-2 border-t-slate-200 border-t-2 border-solid flex'>
			<Textarea placeholder="Aa" className='flex-1' ref={messageRef} />
			<SendMessageButton sendingMessage={sendingMessage} handleSendMessage={handleSendMessage}/>
		</div>
	)
}

export default ChatBox