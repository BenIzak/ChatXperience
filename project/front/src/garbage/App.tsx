import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import LeadLayout from './components/layout/LeadLayout';
import Loader from './components/common/loaders/Loader';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { store } from './redux/store';

const queryClient = new QueryClient();

const Home = lazy(() => import('./pages/Home.page'));
const Chat = lazy(() => import('./pages/Chat.page'));
const Login = lazy(() => import('./pages/Login.page'));
const NotFound = lazy(() => import('./pages/NotFound.page'));
const Dashboard = lazy(() => import('./pages/Dashboard.page'));


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense fallback={
            <div className="w-screen h-screen flex justify-center items-center">
              <Loader type="spinner" />
            </div>
          }>
            <LeadLayout />
            <main className="h-full w-full lg:pl-72">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="login" element={<Login />} />
                <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
