// src/hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { verifyAuth, logout } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'

export const useAuth = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    )

    useEffect(() => {
        dispatch(verifyAuth())
    }, [dispatch])

    const logoutUser = () => {
        dispatch(logout())
    }

    return { isAuthenticated, logoutUser }
}
