import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import React from 'react'

const SendMessageButton = ({sendingMessage, handleSendMessage}) => {
	if (sendingMessage) {
		return (
    	<Button disabled>
      	<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      	Sending message
    	</Button>
		)
	}
	return (
      <Button onClick={handleSendMessage}>Send message</Button>
	)
}

export default SendMessageButton