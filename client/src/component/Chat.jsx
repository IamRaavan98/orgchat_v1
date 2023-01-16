import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chat = ({ id, data, talktoPerson,fetchAllusersName }) => {
  

  const [loginUserId, setLoginUserId] = useState(null);
  const [message, setMessage] = useState();

  const userid = useParams();

  //below code to get user login id in state and state does update again and again.
  if (loginUserId === null && userid) {
    setLoginUserId(userid.id);
  }

  const addMessage = async (e) => {
   
    e.preventDefault();

    // console.log(message,id);
    if (id) {
      const res = await axios.post(`/${id}`, {
        message: message,
      });
    }
    // console.log(res);
    //we are doing setmessage(" ") as our input field become empty after sending the message
    setMessage(" ");
    talktoPerson(id);
    fetchAllusersName();
    fetchAllusersName();
  };

useEffect(()=>{
  var messageBody = document.querySelector('#bottom');
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

},data)


  return (
    <div  className="bg-[#03203C] flex flex-col justify-end h-full">
      <div  id="bottom" className="border flex flex-col justify-end flex-end overflow-y-scroll h-[630px]">
      
        {data &&
          data.chats.map((chat) =>
            loginUserId === chat.user ? (
              <div className="flex  flex-col-reverse justify-center pr-[20px]">
              
                <div className="flex justify-end  chat chat-end">
                  <div className="chat-bubble bg-[#291fee]">  
                    <h1 className="text-xl font-medium ">{(chat.message)?(chat.message):("")}</h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col  pl-[20px]">
              <div className="flex justify-start   chat chat-start">
                <div className="chat-bubble bg-[#291fee]">
                  <h1 className="text-xl font-medium ">{chat.message}</h1>
                </div>
              </div>
            </div>
            )
          )}
    </div >
      <div className="w-full ">
        <label className="border rounded-3xl flex flex-row ">
          <input
            className="w-full pl-[20px] text-[#fff] text-2xl font-medium bg-[#03203C]"
            placeholder="Write a message"
            type="search"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="px-10 py-4 font-normal rounded-3xl  text-4xl text-[#ffffffe0]  border hover:bg-[#ffffffe0] hover:text-[#120E43] "
            onClick={(e) => addMessage(e)}
            type="submit"
            value="submit"
          >
            Send
          </button>
        </label>
      </div>
    </div>
  );
};
export default Chat;
