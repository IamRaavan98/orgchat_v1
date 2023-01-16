import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Chat from "./Chat";
import User from "./User";
const Home = () => {

  const [idFrom, setIdFrom] = useState();
  const [messageData, setMessageData] = useState();
  const [name, setName] = useState(false);

  const { id } = useParams();

  const talktoPerson = async (id) => {
    //  console.log("addd message",id);
    setIdFrom(id);

    const { data } = await axios.get(`process.env.REACT_APP_BACKEND_URL/message/fetchmessages/${id}`);
    //  console.log(data);
    setMessageData(data);
  };

  const handleLogout = async () => {
    const res = await axios.get(`process.env.REACT_APP_BACKEND_URL/logout`);

  };

  async function fetchAllusersName() {
    try {
      const res = await axios.get(`process.env.REACT_APP_BACKEND_URL/allLoggingUsersList`);
 
      setName(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-row  ">
      <div className=" flex w-full flex-col">
        <div className="flex flex-row justify-start
         h-[70px]  bg-[#120E43] border-4">
         
         <button
            type="submit"
            className="group ml-[20px]   flex h-[50px] justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-[70px] md:px-[100px] text-md font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
            onClick={() => handleLogout()}
          >
            <Link to="/login"> Logout</Link>
          </button>

          <div className="form-control sm:pl-[100px] md:pl-[200px] lg:pl-[250px]  xl:pl-[400px]  border-4 ">
            <div className="input-group ">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
      
        </div>

        <div className="flex flex-row"> 
          <User
            name={name}
            fetchAllusersName={fetchAllusersName}
            talktoPerson={talktoPerson}
          />
          <div className="w-full ">
            <Chat
              fetchAllusersName={fetchAllusersName}
              id={idFrom}
              data={messageData}
              talktoPerson={talktoPerson}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
