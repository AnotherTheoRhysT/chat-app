import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

const useConversations = () => {
	const { data, error, isLoading } = useSWR(`${process.env.SERVER_URL}/api/chat/conversation/`, fetcher)
	return {
		data, error, isLoading
	}
}

export default useConversations