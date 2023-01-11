import React, { useEffect, useState } from "react";
import axios from "axios";
// const Base_URL = "http://localhost:4000";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Chat from "./Chat";

const User = ({talktoPerson}) => {
  const [names, setNames] = useState("");
  const [users, setUsers] = useState(null);
 
  async function fetchAllusersName() {
    try {
      const res = await axios.get(`/getallusers`);
    //   console.log(res.data);
      setNames(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllusersName();
  }, [users]);
  return (
    <div>
      {/* <div>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </div> */}

      <div className="flex flex-row">
        <div className="flex flex-row">
          <div className="border-2 border-black h-screen w-[350px]">
            <div>
              <input type="text" />
              <label htmlFor="">search</label>
            </div>

            <div className="">
              <tr className="]">
                <td className=" ">
                  {names &&
                    names.map((nameofEmplyee) => (
                        <h2 className="w-[350px] border-2 border-red-600 font-semibold text-[30px] px-2 py-2  cursor-pointer">
                        
                        <Link onClick={()=>(talktoPerson(nameofEmplyee._id))}>{nameofEmplyee.name}</Link>
                      </h2>
                    ))}
                </td>
              </tr>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
};
export default User;
