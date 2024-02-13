import { BrowserRouter as Router } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Provider } from 'react-redux'
import { store } from '@redux/store'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AppRoutes from '@/router/AppRoutes'
import Navbar from '@components/layout/Navbar'
import { Suspense } from 'react'
import Loader from './components/loaders/Loader'

const queryClient = new QueryClient()

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ToastContainer stacked newestOnTop limit={3} />
                <Router>
                    <Navbar />
                    <main className="h-[92svh] w-full flex-1 overflow-auto p-4">
                        <Suspense
                            fallback={
                                <div className="flex h-full w-full items-center justify-center">
                                    <div className="flex-row items-center justify-center gap-x-4">
                                        <Loader type="spinner" />
                                        <h1 className="text-3xl font-bold text-typo-secondary">
                                            Loading content...
                                        </h1>
                                    </div>
                                </div>
                            }
                        >
                            <AppRoutes />
                        </Suspense>
                    </main>
                </Router>
            </QueryClientProvider>
        </Provider>
    )
}
