import ChatList from '@/components/chat/ChatList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '@/api/services/user'
import { RootState } from '@/redux/store'
import { setUser } from '@/redux/slices/userSlice'

export default function ChatPage() {
    const dispatch = useDispatch()
    const { userId, token } = useSelector((state: RootState) => state.auth)

    const fetchUserData = async () => {
        try {
            const UserData = await getUser(userId!, token!) // Add '!' to assert that userId and token are not null
            if (UserData) {
                dispatch(setUser(UserData))
            } else {
                console.error('Failed to fetch user data')
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error)
        }
    }

    useEffect(() => {
        if (userId && token) {
            fetchUserData()
        }
    }, [userId, token]) // Include userId and token in the dependency array

    return (
        <div className="flex h-full w-full flex-row">
            <ChatList />
        </div>
    )
}
