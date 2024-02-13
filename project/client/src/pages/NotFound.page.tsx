import { NavLink } from 'react-router-dom'

interface linksProps {
    name: string
    href: string
    description: string
    icon: string
}

function VariousLinks({ name, href, description, icon }: linksProps) {
    return (
        <li key={name} className="relative flex items-start gap-x-6 py-6">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-white">
                <i
                    className={[icon, 'text-black-300 text-xl'].join(' ')}
                    aria-hidden="true"
                ></i>
            </div>
            <div className="flex min-w-0 flex-auto flex-col items-start justify-start gap-y-1">
                <h3 className="text-black-300 text-sm font-semibold leading-6">
                    <NavLink to={href}>{name}</NavLink>
                </h3>
                <p className="text-black-100 text-sm leading-6">
                    {description}
                </p>
            </div>
            <div className="flex-none self-center"></div>
        </li>
    )
}

export default function NotFound() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <p className="text-base font-semibold leading-8 text-black">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
                Page not found
            </h1>
            <p className="mt-4 text-base text-black/70 sm:mt-6">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
                <h2 className="sr-only">Popular pages</h2>
                <ul
                    role="list"
                    className="-mt-6 divide-y divide-black border-b border-black"
                >
                    <VariousLinks
                        name={'Home'}
                        href={'/'}
                        description={'Go back to the homepage'}
                        icon={'fas fa-home'}
                    />
                    <VariousLinks
                        name={'Chat'}
                        href={'/chat'}
                        description={'Go back to the chat'}
                        icon={'fas fa-users'}
                    />
                </ul>
            </div>
        </div>
    )
}
