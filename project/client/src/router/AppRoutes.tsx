// Correction de ProtectedRoutes pour qu'il retourne un unique élément Routes.
import { useAuth } from '@/hooks/useAuth';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@router/ProtectedRoute';

const ChatPage = lazy(() => import('@/pages/Chat.page'));
const Auth = lazy(() => import('@/pages/Auth.page'));
const NotFound = lazy(() => import('@/pages/NotFound.page'))

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={
                <ProtectedRoute>
                    <ChatPage />
                </ProtectedRoute>
            } />
            <Route path="/chat" element={
                <ProtectedRoute>
                    <ChatPage />
                </ProtectedRoute>
            } />
            <Route path="/login" element={<Auth type="signin" />} />
            <Route path="/register" element={<Auth type="signup" />} />
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}
