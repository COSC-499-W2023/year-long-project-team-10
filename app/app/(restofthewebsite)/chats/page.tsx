"use client";
import Img from "@/app/images/ExamplePenguin.jpeg";
import retrieveChats from "./api/retrieveChatsFromServer";

import React from "react";
import PenguinC from "@/app/images/PenguinC.jpeg";
import { useState, useEffect, useRef } from "react";
import ChatBubble from "../../components/conversations/ChatBubble";
import { useWebSocket } from "../../contexts/WebSocketContext";
import Image from "next/image";
import NoChatSelectedSVG from "@/public/noconversationSelected.svg";
import NoMessagesSVG from "@/public/nomessages.svg";
import UserConversation from "@/app/components/conversations/UserConversation";

export default function Chats() {
	const { sendMessage } = useWebSocket();
	const [chatsList, setChatsList] = useState([]);
	const [messagesList, setMessagesList] = useState([]);
	const [message, setMessage] = useState("");
	const [file, setFile] = useState(null);
	const [shouldBlur, setShouldBlur] = useState(false);
	const [showOptions, setShowOptions] = useState(false);

	// Create a WebSocket connection to the server

	const ws = useRef(null);
	const inputRef = useRef(null);
	const uploadRef = useRef(null);
	const chatID = useRef("");

	//  INFORMATION: QUICK NAVIGATE TO INPUT

	useEffect(() => {
		const handleKeyDownConv = (event: any) => {
			if (event.code === "KeyK") {
				event.preventDefault();
				inputRef.current?.focus();
			}
		};

		window.addEventListener("keydown", handleKeyDownConv);

		return () => {
			window.removeEventListener("keydown", handleKeyDownConv);
		};
	}, []);

	//  INFORMATION: WEBSOCKETS

	useEffect(() => {
		ws.current = new WebSocket("ws://localhost:7979");
		ws.current.onopen = () => {
			console.log("WebSocket connection opened");
		};
		ws.current.onmessage = (event) => {
			const response = JSON.parse(event.data);
			console.log("Message from server: ", response);
			if (response.broadcast) {
				if (response.chatID == chatID.current)
					getMessages(chatID.current);
			} else {
				switch (response.action) {
					case "retrieveMessages":
						if (response.status == 201) {
							//sort the messages by messageID in ascending order
							response.chatMessages.sort((a, b) =>
								a.messageID > b.messageID ? 1 : -1
							);

							setMessagesList(response.chatMessages);
						} else if (response.status == 422) setMessagesList([]);
						break;
					case "insertMessage":
						if (response.status == 201)
							console.log("Message inserted successfully!");
						break;
					case "deleteMessage":
						if (response.status == 201)
							console.log("Message deleted successfully!");
						break;
					case "editMessage":
						if (response.status == 201)
							console.log("Message edited successfully!");
						break;
				}
			}
			sendMessage("signedIn", {});
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (event) => {
			console.error("WebSocket error: ", event);
		};

		// Clean up the WebSocket connection when the component unmounts
		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	async function getChats() {
		let res = await retrieveChats();
		console.log("RESPONSE FROM SERVER FOR CHATS:");
		console.log(res);
		if (res.data) setChatsList(res.data);
		else setChatsList([]);
	}

	async function getMessages(chatID: string) {
		// We need to specify the chatID since state variables are not updated immediately
		const dataToSendToWSS = JSON.stringify({
			action: "retrieveMessages",
			body: { chatID: chatID },
		});
		ws.current.send(dataToSendToWSS);
	}

	async function onSendMessage() {
		console.log("SENDING MESSAGE: " + message);
		console.log("CURRENT CHAT ID: " + chatID.current);
		const body = {
			chatID: chatID.current,
			message: message,
			file: file,
			shouldBlur: shouldBlur,
		};
		const dataToSendToWSS = JSON.stringify({
			action: "insertMessage",
			body: body,
		});
		ws.current.send(dataToSendToWSS);
		setMessage("");
	}

	useEffect(() => {
		getChats();
	}, []);

	function onChatClick(e) {
		console.log(
			"Clicked on chat with id: " + e.currentTarget.dataset.chatId
		); // currentTarget specifies that even if you click a child element, the event is triggered for the parent element for which it is defined, not the child element directly.
		chatID.current = e.currentTarget.dataset.chatId;
		getMessages(chatID.current);
	}

	function onSendingMessage(e) {
		setMessage(e.target.value);
		console.log("MESSAGE: " + message);
	}

	function onDeleteButtonClick(e) {
		console.log(
			"Clicked on delete button with message id: " +
				e.currentTarget.dataset.messageId
		);
		// Now, we need to remove the message from the message list
		let messageId = e.currentTarget.dataset.messageId;
		/*
		let newMessagesList = messagesList.filter(
		  (message) => message.messageID != messageId
		);
		*/
		// Next, we need to make an api call to delete the message from the server
		const dataToSendToWSS = JSON.stringify({
			action: "deleteMessage",
			body: { messageID: messageId, chatID: chatID.current },
		});
		ws.current.send(dataToSendToWSS);
	}

	function saveToDatabaseHandler(editedMessage: string, messageID: string) {
		console.log("Saving message to database: " + editedMessage);
		// Now, we need to make an api call to edit the message on the server
		const dataToSendToWSS = JSON.stringify({
			action: "editMessage",
			body: {
				messageID: messageID,
				message: editedMessage,
				chatID: chatID.current,
			},
		});
		ws.current.send(dataToSendToWSS);
	}

	const prevMessagesListLength = useRef(messagesList.length);
	useEffect(() => {
		if (messagesList.length > prevMessagesListLength.current) {
			const messagesDiv = document.getElementById("list-messages-div");
			if (messagesDiv) {
				messagesDiv.scrollTop = messagesDiv.scrollHeight;
			}
		}
		prevMessagesListLength.current = messagesList.length;
	}, [messagesList]);

	function onFileChange(e) {
		const file = e.target.files[0];
		toBase64(file).then((base64File) => {
			const fileObject = {
				originalName: file.name,
				mimetype: file.type,
				fileData: base64File,
			};
			setFile(fileObject);
			console.log(fileObject);
		});
	}

	function toBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	}

	return (
		<section className="flex flex-row w-full h-full chat-height justify-center items-start px-8 py-4 z-50">
			<section className="rounded-lg shadow w-full lg:w-[30rem] min-w-[30rem] lg:max-w-[30rem] h-full mr-2 bg-white">
				<div className="flex flex-row outline-black w-auto shadow rounded-lg h-fit px-4 py-2 m-4 lg:max-w-[28rem] items-center justify-center">
					<i className="ri-search-eye-fill text-[1.7rem] mr-1"></i>
					<form className="flex-1 h-auto ml-1">
						<input
							ref={inputRef}
							className="w-full h-full px-2 outline-none"
							placeholder="Search for user..."
						/>
					</form>
					<kbd className="bg-black text-white p-2 rounded-lg">k</kbd>
				</div>
				{chatsList.length == 0 && (
					<div className="flex flex-row justify-between items-center p-4 border-2 border-transparent rounded-lg h-full max-h-[8rem] m-4 shadow">
						<p className="text-[1rem] font-normal break-words w-[20rem]">
							You don't have any chats yet! Start a new chat
							today!
						</p>
					</div>
				)}
				{chatsList.length != 0 &&
					chatsList.map((chat) => {
						return (
							<UserConversation onChatClick={onChatClick} chatID={chat.chatID} profilePicture={PenguinC.src} name={chat.name} username={chat.username} isPinned={false} newMessages={0} />
						);
					})}
			</section>
			<section className="hidden lg:flex flex-col items-start w-full rounded-lg shadow h-full bg-white ml-2">
				<div className="flex-1 px-4 py-2 p-4 h-full mb-0 w-full">
					{chatID.current === "" && (
						<div className="flex flex-col justify-center items-center p-4 border-2 border-transparent rounded-lg h-full">
							<Image src={NoChatSelectedSVG} width={400} height={400} alt="No Chats Selected" />
							<div className="max-w-[25rem] flex flex-col justify-center items-center py-10">
							<h2 className="text-3xl font-medium text-center">
								No conversation selected	
							</h2>
								<p className="text-xl font-light text-center">
									Looks like you haven’t selected a conversation yet. Select one to start talking.
								</p>
							</div>
						</div>
					)}
					{chatID.current !== "" && messagesList.length !== 0 && (
						<div className="flex flex-col justify-center items-center p-4 border-2 border-transparent rounded-lg h-full">
							<Image src={NoMessagesSVG} width={400} height={400} alt="No Messages" />
							<div className="max-w-[25rem] flex flex-col justify-center items-center py-10">
							<h2 className="text-3xl font-medium text-center">
								No messages yet
							</h2>
								<p className="text-xl font-light text-center">
									Looks like you haven’t started a conversation with Satanshu yet. Be the first to say hello 👋!
								</p>
							</div>
						</div>
					)}
					{false && messagesList.map((message) => {
						return (
							<ChatBubble
								key={message.messageID + message.message}
								id={message.messageID}
								name={message.name}
								message={message.message}
								profilePicture="Smth"
								attachmentExt={
									message.fileExtension
										? message.fileExtension
										: null
								}
								isYou={message.isYou}
								onDeleteButtonClick={onDeleteButtonClick}
								saveToDatabaseHandler={saveToDatabaseHandler}
								signedURL={
									message.signedURL ? message.signedURL : null
								}
							/>
						);
					})}
				</div>
				{chatID.current !== "" && (
					<div className="px-4 py-2 my-2 w-full bg-transparent">
						<div className="flex flex-row outline-black shadow rounded-lg h-fit w-full px-4 py-2 items-center justify-center">
							<div className="flex-1 flex flex-row h-auto ml-1 items-center">
								<div
									className="relative"
									onMouseEnter={() => {
										setShowOptions(true);
									}}
									onMouseLeave={() => {
										setShowOptions(false);
									}}
								>
									{showOptions && (
										<div className="absolute p-4 shadow bg-white bottom-full rounded-lg right-[-100%]">
											<div className="shadow rounded-lg bg-pink-500 hover:bg-pink-600 hover:cursor-pointer">
												<label for="fileInput">
													<i className="ri-file-upload-fill text-[1.7rem] mr-1 text-white p-4 hover:cursor-pointer"></i>
												</label>
												<input
													type="file"
													onChange={onFileChange}
													className="hidden"
													ref={uploadRef}
													id="fileInput"
												/>
											</div>
										</div>
									)}
									<i className="ri-layout-grid-fill text-[1.7rem] mr-1 hover:cursor-pointer"></i>
								</div>
								<div className="flex flex-col justify-start items-start px-4">
									<p className="font-bold text-[1rem]">
										Blur Video
									</p>
									<input
										type="checkbox"
										onChange={(e) =>
											setShouldBlur(e.target.checked)
										}
									/>
								</div>
								<input
									className="w-full h-auto px-2 outline-none flex-1"
									placeholder="Send a message"
									onChange={onSendingMessage}
									onKeyDown={(e) => {
										if (e.key == "Enter") {
											e.preventDefault();
											onSendMessage();
										}
									}}
									value={message}
								/>
								<button
									type="button"
									className="hover:cursor-pointer bg-white p-1 rounded-lg"
									onClick={onSendMessage}
								>
									<i className="ri-send-plane-2-fill text-[1.7rem] ml-1 text-black"></i>
								</button>
							</div>
							{
								//<kbd>o</kbd>
							}
						</div>
					</div>
				)}
			</section>
		</section>
	);
}