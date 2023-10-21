import React, { useContext, useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AuthContext } from '@/components/providers/AuthProvider'

import axios from 'axios'


// const FormSchema = z.object({
//   message: z.string()
// }).required()

const ChatBox = ({messages, setMessages, convoId}) => {
	// const form = useForm({
  //   resolver: zodResolver(FormSchema),
  // })

	// const onSubmit = (formData) => {
	// 	console.log(formData.message)
	// 	formData.message = ""
	// }
	const [auth, setAuth] = useContext(AuthContext)
	// console.log('auth', auth)

	const messageRef = useRef(null);

	useEffect(() => {
		messageRef.current.focus()
	}, [])

	const handleSendMessage = () => {
		console.log(messageRef.current.value)
		// const newMessage = {

		// }
		// conversation_id: 26
		// deleted_at: null
		// id: 73
		// message_text:  "Officia at odit perspiciatis molestiae itaque rem. Quis nisi ipsum cumque quibusdam quis aperiam. Sit amet impedit magni voluptates. Similique sed tempore rerum dicta quis fuga architecto."
		// sent_timestamp: "2023-10-08T11:13:57.000000Z"
		// user: 
		// 	created_at: "2023-10-08T10:23:38.000000Z"
		// 	email: "queen57@example.net"
		// 	email_verified_at: "2023-10-08T10:23:38.000000Z"
		// 	id: 22
		// 	name: "Miss Dominique Jacobson"
		// 	updated_at: "2023-10-08T10:23:38.000000Z"

		// 	created_at: "2023-10-08T10:23:38.000000Z"
		// 	email: "bette47@example.com"
		// 	email_verified_at: "2023-10-08T10:23:38.000000Z"
		// 	id: 23
		// 	name: "Cleo Nader"
		// 	updated_at: "2023-10-08T10:23:38.000000Z"


		// setMessages([...messages, ])
		axios.post(`${process.env.SERVER_URL}/api/chat/message/send`, {
			conversation_id: convoId,
			message_text: messageRef.current.value
		})
		.then(res => {
			console.log("Sent", res)
			messageRef.current.value = ''
		})
		.catch(err => {
			console.log("Message send error", err)
		})
	}

	return (
		<div className='relative bottom-0 right-0 w-full p-2 border-t-slate-200 border-t-2 border-solid flex'>
			<Textarea placeholder="Aa" className='flex-1' ref={messageRef} />
      <Button onClick={handleSendMessage}>Send message</Button>
		</div>
	)
}

export default ChatBox