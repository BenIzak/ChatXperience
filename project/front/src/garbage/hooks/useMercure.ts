import { setMessages } from '@/redux/slices/chatSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useMercure = (url: never, topic: never) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const eventSource = new EventSource(`${url}?topic=${encodeURIComponent(topic)}`);
        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(setMessages(message));
        };
        return () => {
            eventSource.close();
        };
    }, [url, topic, dispatch]);
}