import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useState } from "react";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user?._id) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId: user?._id,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, targetUserId]);

  const sendMessage = async () => {
    if (!user?._id) return;
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId: user?._id,
      targetUserId,
      text: newMessage,
    });
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[76vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-center"> Chat </h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              {user.firstName === msg.firstName && (
                <div className="chat chat-start">
                  <div className="chat-image avatar"></div>
                  <div className="chat-header">
                    {msg.firstName}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              )}
              {user.firstName !== msg.firstName && (
                <div className="chat chat-end">
                  <div className="chat-image avatar"></div>
                  <div className="chat-header">
                    {msg.firstName}
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-600 flex items-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="input w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-secondary m-2" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
