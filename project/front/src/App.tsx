import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux';
// import LeadLayout from './components/layout/LeadLayout';
import Loader from '@components/loaders/Loader';
// import ProtectedRoute from './components/routes/ProtectedRoute';
// import { store } from './redux/store';

const queryClient = new QueryClient();

// const Home = lazy(() => import(''));
// const Chat = lazy(() => import('./pages/Chat.page'));
const Auth = lazy(() => import('./pages/Auth.page'));
const NotFound = lazy(() => import('./pages/NotFound.page'));
//const Dashboard = lazy(() => import('./pages/Dashboard.page'));


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            <Loader type="spinner" />
          </div>
        }>
          <main className="h-full w-full">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="login" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
