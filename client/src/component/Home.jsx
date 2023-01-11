import React, { useEffect, useState } from "react";
import axios from "axios";
// const Base_URL = "http://localhost:4000";
import { BrowserRouter as Router, Routes, Route, Link,useParams } from "react-router-dom";
import Chat from "./Chat";
import User from "./User";



const Home = () => {     
  const BaseUrl = "http://localhost:3000/message/fetchmessages";

  const [idFrom, setIdFrom] = useState();
   const [messageData,setMessageData] = useState()
      
   const {id} = useParams()
  
  const talktoPerson =async (id) => {
    //  console.log("addd message",id);
    setIdFrom(id);
  const {data}= await axios.get(`${BaseUrl}/${id}`)
    
    setMessageData(data)
    
 }  
  return (
    <div  className="flex flex-row  border-red-500">
      <div className="border-4 ">
        <User talktoPerson={talktoPerson} />
      </div>
      <div className="w-full ">
        <Chat id={idFrom}  data={messageData} talktoPerson={talktoPerson} />
      </div>
    </div>
  );
};
export default Home;
