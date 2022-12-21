import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
function App(){
    return(
        <> 
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
        </Routes>
        </>
    );
}
export default App;
