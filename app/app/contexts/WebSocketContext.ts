import React, { createContext, useContext, useEffect, useState, FunctionComponent } from 'react';
import { ReactNode } from 'react';
// Define a type for the context state
interface WebSocketContextState {
    isConnected: boolean;
    userStatus: 'signedIn' | 'signedOut';
    sendMessage: (message: any) => void; // Adjust the type of `message` based on your actual usage
}

const WebSocketContext = createContext<WebSocketContextState>({
  isConnected: false,
  userStatus: 'signedOut',
  sendMessage: () => {}, // placeholder function
});

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<'signedIn' | 'signedOut'>('signedOut');

    useEffect(() => {
        const ws = new WebSocket('ws://your-websocket-server.com');

        ws.onopen = () => setIsConnected(true);
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'userStatus') {
                setUserStatus(message.status);
            }
        };
        ws.onclose = () => setIsConnected(false);

        const sendMessage = (message: any) => { // Adjust the type of `message` as needed
            if (isConnected) {
                ws.send(JSON.stringify(message));
            }
        };

        return () => {
            ws.close();
        };
    }, []);

  return (
    <WebSocketContext.Provider value={{ isConnected, userStatus, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}

// Custom hook to use the WebSocket context
export function useWebSocket() {
    return useContext(WebSocketContext);
}

