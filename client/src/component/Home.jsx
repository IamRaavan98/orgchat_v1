import React, { useEffect, useState } from "react";
import axios from "axios";
// const Base_URL = "http://localhost:4000";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./Chat";
import User from "./User";

const Home = () => {
  const [id, setId] = useState();
  const [idFrom, setIdFrom] = useState();
   const [messageData,setMessageData] = useState()
  const talktoPerson =async (id) => {
    setId(id);
    const {data}= await axios.get(`message/fetchmessages/${id}`)
    setMessageData(data)
    setIdFrom(data.person1.from);

    // console.log(id,data.person1.from);
   
    // console.log(data);
    
    }

  return (
    <div  className="flex flex-row">
      <div className="border-4 ">
        <User talktoPerson={talktoPerson} />
      </div>
      <div>
        <Chat id={idFrom}  data={messageData} talktoPerson={talktoPerson} />
      </div>
    </div>
  );
};
export default Home;
