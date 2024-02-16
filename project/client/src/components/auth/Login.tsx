import { loginUser } from '@/api/services/auth'
import { getUser } from '@/api/services/user'
import { loginSuccess } from '@/redux/slices/authSlice'
import CompanyLogo from '@assets/icon/ChatXperienceLogo.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | undefined>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email || !password) {
            console.error('The email or password is required to login')
            setMessage('The email or password is required to login')
            return
        }

        setMessage('')

        try {
            const result = await loginUser({ email, passwd: password })
            if (!result.data) {
                setMessage('An error occurred while trying to login')
                return
            }
            setMessage('login successful')
            dispatch(loginSuccess(result.data))
            toast.success('Login successful')

            navigate('/profile')
        } catch (error) {
            console.error('An error occurred while trying to login', error)
            setMessage('An error occurred while trying to login')
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center">
            <div className="flex flex-col items-center justify-center space-y-6 text-center text-gray-600 sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    src={CompanyLogo}
                    alt="ChatXperience"
                    className="h-24 w-24"
                />

                <h1 className="title-h1">ChatXperience</h1>
                <h2 className="title-h2">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="relative">
                        <input
                            type="email"
                            id="emailLogin"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="email"
                            className="caption-primary absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            Email Address
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            id="passwordLogin"
                            autoComplete="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="caption-primary absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            Password
                        </label>
                    </div>
                    <div className="text-sm text-red-500">{message}</div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <NavLink
                                    to="/"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn-primary w-full text-typo-reverse"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    need an account?{' '}
                    <NavLink
                        to="/register"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    )
}
