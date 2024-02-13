import Signin from '@components/auth/Login'
import Signup from '@components/auth/Register'

export default function Auth({ type }: { type: 'signin' | 'signup' }) {
    return (
        <div className="flex h-full flex-row justify-center items-start pt-16">
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                {type === 'signin' && <Signin />}
                {type === 'signup' && <Signup />}
            </div>
        </div>
    )
}
