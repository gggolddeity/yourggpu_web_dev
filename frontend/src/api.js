export const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    return res.json();
};

export const postMessage = async content => {
    const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
    return res.json();
};

export const fetchEvents = async () => {
    const res = await fetch('/api/events');
    return res.json();
};

export const postEvent = async ({ aggregateId, type, data }) => {
    const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aggregateId, type, data })
    });
    return res.json();
};