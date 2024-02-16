import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { UserData } from '@/types'
import formatDateString from '@/hooks/useDateFormat'
import { getUser } from '@/api/services/user'
import { setUser } from '@/redux/slices/userSlice'

export default function UserProfilePage() {
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

    const user = useSelector(
        (state: RootState) => state.user.user
    ) as UserData | null

    return (
        <section className="bg-gray-200 py-24 dark:bg-dark">
            <div className="mx-auto px-4 md:container">
                <div className="mx-auto w-full max-w-[970px]">
                    {user && (
                        <div className="flex flex-col items-center space-y-2 text-center">
                            <h3 className="text-xl font-semibold text-dark dark:text-white sm:text-2xl">
                                {user.firstname} {user.lastname}
                            </h3>
                            <p className="text-base font-medium text-gray-600">
                                {user.email}
                            </p>
                            <span
                                className={[
                                    'mb-4 text-xl font-semibold ',
                                    user.connected
                                        ? 'text-green-500'
                                        : 'text-red-500',
                                ].join(' ')}
                            >
                                {user.connected ? 'Online' : 'Offline'}
                            </span>
                            <p className="pt-4 text-gray-600">
                                Created At:{' '}
                                {formatDateString(user.created_at, 'long')}
                            </p>
                            <p className="text-gray-600">
                                Last Modification:{' '}
                                {formatDateString(user.updated_at, 'long')}
                            </p>
                            <p className="text-gray-600">
                                Last Connection:{' '}
                                {formatDateString(user.last_connection, 'long')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
