import io from 'socket.io-client'

export const socket = io(`${import.meta.env.VITE_REACT_APP_API}`,
    {
        autoConnect: false

    }
);
