import { loginUser } from '@/api/services/auth'
import { setUser } from '@/redux/slices/authSlice'
import CompanyLogo from '@assets/icon/ChatXperienceLogo.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState<string | undefined>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const dispatch = useAppDispatch();
    //const [loginMutation] = useLoginMutation();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!email || !password) {
            console.error('The email or password is required to login')
            setMessage('The email or password is required to login')
            return
        }

        setMessage('')

        const result = await loginUser({ email, password })

        if (result.success) {
            toast.success('Login successful', {
                position: 'top-right',
                autoClose: 3000,
            })
            console.log('Login successful', result.data)

            localStorage.setItem('token', result.data.jwt)
            // Dispatch the setUser action with the user data to update the store
            dispatch(
                setUser({ id: result.data.id, name: result.data.firstname })
            )

            navigate('/chat') // Use navigate to redirect
        } else {
            setMessage(result.message)
            console.error('Error while login', result.message)
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
