import { useQuery } from '@tanstack/react-query';
import { getUserDetails } from '@/api/services/user';
import ChatList from '@/components/chat/ChatList';
import { setUser } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import {  User } from '@/api';

export default function ChatPage() {
    const dispatch = useDispatch();
    const userId = Number(localStorage.getItem('userId'));

    const { data,isSuccess } = useQuery({
        queryKey: ['userDetails'],
        queryFn: () =>  getUserDetails(userId),
        refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
        refetchOnWindowFocus: true, // Refetch when window regains focus
    });

    if (isSuccess) {
        dispatch(setUser(data as User));
    }

    return (
        <div className="flex h-full w-full flex-row">
        <ChatList />
   </div>
    )
}
