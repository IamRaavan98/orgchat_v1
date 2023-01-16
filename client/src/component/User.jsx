import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiMessageAltAdd } from "react-icons/bi";

import { useParams } from "react-router-dom";

const User = ({ name, talktoPerson, fetchAllusersName }) => {
  const [loginUserId, setLoginUserId] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    fetchAllusersName();
  });

  // console.log(name,name,"iamworking");
  let userid = useParams();

  //below code to get user login id in state and as in users list we do not want logging user name itself tobe present..

  if (loginUserId === null && userid.id) {
    setLoginUserId(userid.id);
  }

  const [username, setUserName] = useState("");
  const [hideNewMessage, setHideNewMessage] = useState();
  const HandleUserSelect = ({ nameofEmplyeeid, nameofEmplyee }) => {
    if (name) {
      // this is checking for new message in logged user schema we pass the array of all the new messages received from different users in newMessage state
      for (let index = 0; index < name.length; index++) {
        if (userid.id === name[index]._id) {
          setNewMessage(name[index].messageCount);
        }
      }
    }

    const handleClickButton = async (theuserNameYouHaveClickedOn) => {
      talktoPerson(nameofEmplyee._id);
      setHideNewMessage("hidden");
      if (nameofEmplyee._id) {
        try {
          await axios.post(`/message/clearNewMessageNotification`, {
            idTo: nameofEmplyee._id,
          });
        } catch (error) {
          console.log(error.message);
        }
      }

      setUserName(theuserNameYouHaveClickedOn);

      var messageBody = document.querySelector("#bottom");
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
    };

    return (
      <>
        {/* if the user on which you have clicked is same as backend data it changes color... earlier it changes all user color if clicked on anyone */}

        <h2
          onClick={() => handleClickButton(nameofEmplyee.name)}
          className={`bg-[${
            username === nameofEmplyee.name ? "#03203C" : "#120E43"
          }] w-[350px] pl-[100px] hover:bg-[#03203C]   font-semibold text-[30px] text-[#ffffffe0] px-2 py-2  cursor-pointer`}
        >
          {/* here below we are displaying the new messages based on the array of obj inside newMessage with the each employee id */}
          {nameofEmplyee.name}

          <p>
            {newMessage != null &&
              newMessage.map((notification) =>
                notification.fromId === nameofEmplyeeid &&
                notification.count > 0 ? (
                  <div className={`${hideNewMessage} flex flex-row`}>
                    <BiMessageAltAdd className="text-lg bg-orange-400" />
                    <p className="pl-1 text-red-500 text-lg">
                      {notification.count} New Messages
                    </p>
                  </div>
                ) : null
              )}
          </p>
        </h2>
      </>
    );
  };

  return (
    <div className="border-2 flex flex-row ">
      <div className="bg-[#120E43] h-[700px] w-[270px] md:w-[350px]">
        <tr className="">
          <td className="">
            {name &&
              name.map((nameofEmplyee) =>
                // this below code just did not allow logging user name to show
                loginUserId !== nameofEmplyee._id ? (
                  <HandleUserSelect
                    nameofEmplyeeid={nameofEmplyee._id}
                    nameofEmplyee={nameofEmplyee}
                  />
                ) : null
              )}
          </td>
        </tr>
      </div>
    </div>
  );
};
export default User;
