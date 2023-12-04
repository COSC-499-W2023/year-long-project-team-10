"use client";
import Image from "next/image";
import ChatBubble from "../components/conversations/ChatBubble";
import Img from "../images/ExamplePenguin.jpeg";
import retrieveChats from "./api/retrieveChatsFromServer";
import { get } from "http";
import { useRef, useEffect, useState, use } from "react";

export default function Chats() {
  
  const [chatsList, setChatsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [message, setMessage] = useState("");
    
  // Create a WebSocket connection to the server
  
  const ws = useRef(null);
  const chatID = useRef("");

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:7979');
  

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log('Message from server: ', response);
      switch(response.action) {
        case "setMessages":
          if(response.status == "201")
            setMessagesList(response.data);
          else if(response.status == "422")
            setMessagesList([]);
          else console.log("Error retrieving messages from server.");
          break; 
        case "refreshMessages": 
          if(response.status == "201")
            getMessages(chatID.current);
          else if(response.status == "422")
            setMessagesList([]);
          else console.log("Error retrieving messages from server.");
          break;
      }
      
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (event) => {
      console.error('WebSocket error: ', event);
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
    if(res.data)
      setChatsList(res.data);
    else setChatsList([]);

  }

  async function getMessages(chatID: string) { // We need to specify the chatID since state variables are not updated immediately
    const dataToSendToWSS = JSON.stringify({action: "retrieveMessages", body:{  chatID: chatID }});
    ws.current.send(dataToSendToWSS);
  }

  async function onSendMessage() {
    console.log("SENDING MESSAGE: " + message);
    const dataToSendToWSS = JSON.stringify({action: "insertMessage", body:{  chatID: chatID.current, message: message }});
    ws.current.send(dataToSendToWSS);
    setMessage("");
  }

  useEffect(() => {
    getChats();
  }, []);


  function onChatClick(e) {
    console.log("Clicked on chat with id: " + e.currentTarget.dataset.chatId); // currentTarget specifies that even if you click a child element, the event is triggered for the parent element for which it is defined, not the child element directly.
    chatID.current = e.currentTarget.dataset.chatId;
    getMessages(chatID.current);
  }

  function onSendingMessage(e) {
    setMessage(e.target.value);
    console.log("MESSAGE: " + message);
  }

  function onDeleteButtonClick(e) {
    console.log(
      "Clicked on delete button with message id: " + e.currentTarget.dataset.messageId
    );
    // Now, we need to remove the message from the message list
    let messageId = e.currentTarget.dataset.messageId;
    /*
    let newMessagesList = messagesList.filter(
      (message) => message.messageID != messageId
    );
    */
    // Next, we need to make an api call to delete the message from the server
      const dataToSendToWSS = JSON.stringify({action: "deleteMessage", body:{  messageID: messageId }});
      ws.current.send(dataToSendToWSS);
  }

  function saveToDatabaseHandler(editedMessage: string, messageID: string) {
    console.log("Saving message to database: " + editedMessage);
    // Now, we need to make an api call to edit the message on the server
    const dataToSendToWSS = JSON.stringify({action: "editMessage", body:{  messageID: messageID, message: editedMessage }});
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

  return (
    <section className="m-4 grid grid-cols-4 grid-rows-1 rounded-lg shadow-md drop-shadow-md w-screen h-[50rem] bg-gray-100">
      {/* First, we need to make an api call to the RetrieveChats route */}

      <div className = "flex flex-col itmes-center col-span-1 overflow-y-scroll">

        {
            chatsList.length == 0 ? 
            (<div className = "flex flex-col items-center justify-center h-full"> 
              <h1 className = "text-2xl font-bold"> No chats yet! </h1> 
              <h2 className = "text-xl font-normal"> Start a conversation with someone! </h2> 
            </div>)
            : 
            (chatsList.map((chat) => {
            return (
              <div onClick = {onChatClick} data-chat-id = {chat.chatID} className="m-2 rounded-lg shadow-md drop-shadow-md flex flex-row justify-evenly bg-white h-fit w-full"> {/* A single chat */}
                <div className="flex flex-row justify-between flex-1 p-4">
                  <div className="p-2">
                    <img
                      src={Img.src}
                      alt="Example"
                      className="w-24 rounded-full object-scale-down"
                    />
                  </div>
                  <div className="flex flex-col flex-1 w-full items-start justify-center p-2"> 
                    <span className="text-center">{chat.name}</span>
                    <span className="text-center">@{chat.username}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-2">
                  <span className="p-1 rounded-full bg-pink-600 w-8 h-8 text-center text-white font-normal">
                    2
                  </span>
                </div>
              </div>
            )
          }))

        }

      </div>

      <section className="m-2 rounded-lg shadow-md drop-shadow-md col-span-3 flex flex-col justify-evenly ">
        <div id = "list-messages-div" className="flex-1 p-2 overflow-y-auto">
          {
            messagesList.length == 0 ? 
            (<div className = "flex flex-col items-center justify-center h-full"> 
              <h1 className = "text-2xl font-bold"> No messages yet! </h1> 
              <h2 className = "text-xl font-normal"> Start a conversation! </h2>
              <h2 className = "text-xl font-normal"> Or, select a chat from the left! </h2>
            </div>)
            :(messagesList.map((message) => {
              return (
                <ChatBubble
                key = {message.messageID}
                  id={message.messageID}
                  name={message.name}
                  message={message.message}
                  profilePicture={""}
                  hasAttachment={false}
                  isYou={message.isYou}
                  onDeleteButtonClick = {onDeleteButtonClick}
                  saveToDatabaseHandler={saveToDatabaseHandler}
                />
              )
            }))
          }
         
        </div>
        <div className="p-2">
          <div className="flex flex-row justify-between items-center p-2">
            <input
              type="text"
              className="w-full h-12 rounded-lg shadow-md drop-shadow-md p-2 m-2"
              placeholder="Type a message..."
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
              id="sendButton"
              className="w-12 h-12 rounded-lg shadow-md drop-shadow-md bg-blue-600 text-white m-2"
              onClick={onSendMessage}
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
