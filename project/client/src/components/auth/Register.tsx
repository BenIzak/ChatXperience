import CompanyLogo from '@assets/icon/ChatXperienceLogo.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Register() {
    const [jwt, setJwt] = useState('test_jwt_token')
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLasttName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleSignup = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        if (password !== passwordConfirm) {
            console.error('Les mots de passe ne correspondent pas !')
            return
        }

        try {
            const newUser = { email, firstName, lastName, password, jwt }
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })

            if (response.ok) {
                console.log('Inscription réussie !')
            } else {
                console.error("Erreur lors de l'inscription")
            }
        } catch (error) {
            console.error(error.message)
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
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div className="relative">
                        <input
                            type="text"
                            id="firstName"
                            autoComplete="false"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="firstName"
                            className="caption-primary absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            first name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            id="lastName"
                            autoComplete="false"
                            onChange={(e) => setLasttName(e.target.value)}
                            required
                            className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="lastName"
                            className="caption-primary absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-primary rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            last name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            id="emailRegister"
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
                            id="passwordRegister"
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
                    <div className="relative">
                        <input
                            type="password"
                            id="confirmPasswordRegister"
                            autoComplete="password"
                            required
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="caption-primary absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                        >
                            Confirm Password
                        </label>
                    </div>

                    <div>
                        <button
                            className="btn-primary w-full text-typo-reverse"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    already have an account?{' '}
                    <NavLink
                        to="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    )
}
