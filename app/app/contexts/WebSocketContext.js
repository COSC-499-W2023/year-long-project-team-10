// WebSocketContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from "react";

const WebSocketContext = createContext({
	isConnected: false,
	sendMessage: () => {},
	userStatus: "signedOut",
});

export const WebSocketProvider = ({ children }) => {
	const [isConnected, setIsConnected] = useState(false);
	const [userStatus, setUserStatus] = useState("signedOut");
	let ws = useRef(null);

	useEffect(() => {
		ws.current = new WebSocket(`ws://localhost:7979`);

		ws.current.onopen = () => {
			setIsConnected(true);
		};

		ws.current.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case "userStatus":
					console.log("STATUS: ", message.status);
					setUserStatus(message.status);
					break;
				default:
					break;
			}
		};

		ws.current.onclose = () => {
			setIsConnected(false);
		};

		return () => {
			ws.current.close();
		};
	}, []);

	const sendMessage = (action, body) => {
		console.log("WebSocketSendCond: ", ws.current && ws.current.readyState === WebSocket.OPEN);
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			ws.current.send(JSON.stringify({ action, body }));
		}
	};

	return (
		<WebSocketContext.Provider
			value={{ isConnected, sendMessage, userStatus }}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
