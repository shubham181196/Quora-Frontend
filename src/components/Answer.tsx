import { FC } from "react"

import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import { searchProp } from "../App";
import Answerbar from "./Answerbar";

 export const Answer:FC<searchProp>=(props:searchProp)=> {
  
    return (<>
    <div>
        <Navbar setSearch={"hi"}></Navbar>
      </div>
    
    <div className="h-screen w-screen bg-gray-100 grid grid-cols-6">
     
        <div>
        <Leftbar setMenu={props.setMenu}/>
        </div>
        <div className="col-span-3">
        <Answerbar search={props?.search} menu={props.menu}/>
        </div>
    </div>
    </>);
}