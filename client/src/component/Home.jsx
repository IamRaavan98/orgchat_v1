import React, { useEffect, useState } from "react";
import axios from "axios";
const Base_URL = "http://localhost:4000"



const Home = () => {
  const [users, setUsers] = useState(0)
  async function fetchAllusersName(){
    try {
      const res = await axios.get(`${Base_URL}/getallusers`);
      console.log(res);
    } catch (error) {
      console.log(error.message)
    }
    
  }
  
  
  useEffect(()=>{
      fetchAllusersName();
  },[users])
  return(
    <div>
      <div className="flex flex-row">
        <div className="border-4 border-black">
               o<div>
                  <input type="text" />
                  <label htmlFor="">search</label>
                </div>
                <div>
                  <tr>
                    <td>
                        
                    </td>
                  </tr>
                </div>

        </div>
        <div>
               <p>test</p>
        </div>
      </div>
    </div>
  )

};
export default Home;
