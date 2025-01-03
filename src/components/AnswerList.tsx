import Avatar from "react-avatar";
import account from "../assets/account.png";
import question from "../assets/question.png";
import pen from "../assets/pen.png";
import edit from "../assets/edit.png";
import comment from "../assets/comment.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPopup from "./PostPopup";
import axios from "axios";  // You can use fetch instead of axios
import { useLocation } from "react-router-dom";

type searchProp = {
  search: any,
  menu: any
};

const AnswerList = (props: searchProp) => {
  
 

  useEffect(() => {
   
  }, []);

  return (
    
      <div className="bg-white p-2 h-24 rounded-lg border border-spacing-1 w-5/6 ">
       
      </div>

      
);
}
export default AnswerList;
