import { useState, useEffect } from 'react';
import { fetchMessages, postMessage, fetchEvents, postEvent } from './api';

export default function App() {
    const [messages, setMessages] = useState([]);
    const [events, setEvents] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventData, setEventData] = useState('');

    useEffect(() => {
        loadMessages();
        loadEvents();
    }, []);

    const loadMessages = async () => {
        setMessages(await fetchMessages());
    };

    const handlePostMessage = async () => {
        if (!messageInput) return;
        await postMessage(messageInput);
        setMessageInput('');
        loadMessages();
    };

    const loadEvents = async () => {
        setEvents(await fetchEvents());
    };

    const handlePostEvent = async () => {
        try {
            const dataObj = JSON.parse(eventData);
            await postEvent({ aggregateId: 'app', type: eventType, data: dataObj });
            setEventType('');
            setEventData('');
            loadEvents();
        } catch {
            alert('Invalid JSON');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Сообщения</h2>
            <ul>{messages.map(m => <li key={m.id}>{m.content}</li>)}</ul>
            <input
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                placeholder="Новое сообщение"
            />
            <button onClick={handlePostMessage}>Отправить</button>

            <h2>Event Sourcing</h2>
            <ul>
                {events.map(ev => (
                    <li key={ev.id}>
                        [{new Date(ev.timestamp).toLocaleTimeString()}] {ev.type}: {JSON.stringify(ev.data)}
                    </li>
                ))}
            </ul>
            <input
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                placeholder="Тип события"
            />
            <input
                value={eventData}
                onChange={e => setEventData(e.target.value)}
                placeholder='Данные события (JSON)'
            />
            <button onClick={handlePostEvent}>Добавить событие</button>
        </div>
    );
}