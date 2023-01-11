import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chat = ({ id, data, talktoPerson }) => {

  const BaseUrl = "http://localhost:3000/message/addmessage";

  const [loginUserId, setLoginUserId] = useState(null);
  const [message, setMessage] = useState();
   
   const userid = useParams();
   
   //below code to get user login id in state and state does update again and again.
if(loginUserId === null && userid){
  setLoginUserId(userid.id)
}


  const addMessage = async (e) => {
    e.preventDefault();

    // console.log(message,id);
    if(id){
      const res = await axios.post(`${BaseUrl}/${id}`, {
        message: message,
      });
    }
    // console.log(res);
    //we are doing setmessage(" ") as our input field become empty after sending the message
    setMessage(" ");
  };
  talktoPerson(id);

  // if (data) {
  //   console.log(data, id);
  // }

  return (
    <div className="flex flex-col justify-end h-full border-4 border-blue-700">
      <div className="border-4 border-black ">

        {data &&
          data.chats.map((chat) =>
            (loginUserId === chat.user) ? (
              <div className="flex flex-col-reverse justify-center border-4 ">
                {/* {console.log(loginUserId,data.person1.from,data)} */}
                <div className="flex justify-end">
                  <h1 className="text-2xl font-medium ">{chat.message}</h1>
                 
                </div>

                <div className="border-4">
                  <div className="">
                    <div className=""></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" border-4 ">
                <div className="">
                  <div className=""> </div>
                </div>
                <div className="border-4 border-green-700">
                  <div className="">
                    <h1>{chat.message}</h1>
                  </div>
                </div>
              </div>
            )
          )}
      </div>

      <div className="w-full">
        <label className="border-2 flex flex-row  border-emerald-600 ">
          <input
            className="w-full border-2 border-black"
            type="search"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="px-10 py-4 font-normal rounded-3xl border-4 border-yellow-400 text-4xl"
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
