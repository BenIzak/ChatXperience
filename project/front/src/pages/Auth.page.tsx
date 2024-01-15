import Login from '@components/auth/Login';

export default function Auth() {

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Login />
            </div>
        </div>
    );

}
