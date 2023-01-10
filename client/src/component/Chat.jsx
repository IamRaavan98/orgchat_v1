import React, { useState } from "react";
import axios from "axios";
const Chat = ({ id, data, talktoPerson }) => {
  const [messageData, setMessageData] = useState();
  const [message, setMessage] = useState();

  const addMessage = async (e) => {
    e.preventDefault();
    // console.log(message,id);
    const res = await axios.post(`message/addmessage/${id}`, {
      message: message,
    });
    talktoPerson(id);
    //we are doing setmessage(" ") as our input field become empty after sending the message
    setMessage(" ");
  };

  if (data) {
    console.log(data, id);
  }

  return (
    <div className="relative left-[100px] p-[100px] border-4 border-blue-700">
        {data &&
          data.chats.map((chat) =>
            chat.user === data.person1.from ? (
              <div>
                <div className="chat chat-start">
                <div className="chat-bubble">
                  hiiii
                  {/* my messages here below */}
                  {chat.message}
                  {/* {console.log("i am working",data.person1.from,chat.user)} */}
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble">" "</div>
                </div>
                </div>
            </div>
            ) : (
              <div>
                      <div className="chat chat-start">
                <div className="chat-bubble">
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble">{chat.message}</div>
                </div>
                </div>
              </div>
            )
           
          )}

      <div>
        <label className="border-2 border-emerald-600">
          <input
            className="border-2 border-black"
            type="search"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={(e) => addMessage(e)} type="submit" value="submit">
            Send
          </button>
        </label>
      </div>
    </div>
  );
};
export default Chat;
