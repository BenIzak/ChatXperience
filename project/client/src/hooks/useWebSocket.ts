import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { connectStart, connectSuccess, connectFailure } from '@/redux/slices/webSocketSlice';

export default function useWebSocket() {
    const dispatch = useDispatch<AppDispatch>();
    const { isConnected, isConnecting } = useSelector((state: RootState) => state.webSocket);
    const token = localStorage.getItem('token');
    const socketUrl = `ws://localhost:3000/ws?token=${encodeURIComponent(token!)}`;

    // Stocker l'instance WebSocket dans le state local.
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const initWebSocket = useCallback(() => {
        if (!isConnected && !isConnecting) {
            dispatch(connectStart());
            const newSocket = new WebSocket(socketUrl);

            newSocket.onopen = () => {
                dispatch(connectSuccess());
                console.log('WebSocket connection established.');
                setSocket(newSocket); // Définir l'instance de WebSocket dans le state local
            };

            newSocket.onerror = (event) => {
                dispatch(connectFailure('WebSocket connection failed'));
                console.error('WebSocket error:', event);
            };

            newSocket.onclose = (event) => {
                dispatch(connectFailure('WebSocket connection closed'));
                console.log('WebSocket connection closed:', event.reason);
                setSocket(null); // Réinitialiser le state de WebSocket
            };
        }
    }, [dispatch, isConnected, isConnecting, socketUrl]);

    useEffect(() => {
        initWebSocket();

        // Effectuer le nettoyage lors de la désactivation du composant ou de la déconnexion.
        return () => {
            socket?.close();
        };
    }, [initWebSocket]);

    // Exposer la méthode `sendMessage` pour être utilisée par les composants.
    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    // Retourner l'objet contenant `sendMessage` pour l'utiliser dans les composants.
    return { sendMessage };
}
