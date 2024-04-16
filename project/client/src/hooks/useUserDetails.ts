// hooks/useUserDetails.ts
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '@/api/services/user';
import { setUser } from '@/redux/slices/userSlice';
import { User } from '@/api';

export function useUserDetails(userId: number) {
    const dispatch = useDispatch();

    const { data, isSuccess } = useQuery<User, Error>({
        queryKey: ['userDetails', userId],
        queryFn: () => getUserDetails(userId),
        refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
        refetchOnWindowFocus: true,
        onSuccess: (userData: User) => {
            dispatch(setUser(userData));
        },
    });

    return { userDetails: data, isLoading: !isSuccess };
}
