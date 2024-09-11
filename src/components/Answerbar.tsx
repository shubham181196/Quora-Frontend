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

const Answerbar = (props: searchProp) => {
  const [questionData, setQuestionData] = useState<any>([]);
  const [commentToggle, setCommentToggle] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [answers, setAnswers] = useState("");
  const [post, setPost] = useState(false);
  const location = useLocation();
    const { id } = location.state || {};

  // Function to fetch questions from Spring Boot backend
  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8083/api/v1/questions/cec97f89-ea6f-48bd-9dec-5621cb702d0a",{withCredentials:true}); // Replace with your Spring Boot endpoint
      setAnswers(response.data);
      console.log(response.data)  // Assuming the API returns an array of questions
    } catch (err) {
      console.error(err);
    }
  };

  // Function to add an answer through the Spring Boot API
  const addAnswer = async () => {
    try {
      await axios.post(`http://localhost:8080/api/questions/${id}/answers`, {
        ans: answers,
        email: "shubham@example.com"  // Replace with the actual user email
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="p-2 ">
      <div className="bg-white p-2 h-24 rounded-lg border border-spacing-1 w-5/6 ">
        <div className="flex mt-2">
        {true ? <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name="to be placed "/>
      : <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" src={"to be r"}/>}
          <input onClick={() => setPost(true)} placeholder="What do you want to ask or share?" className="bg-zinc-100 
          p-1 pl-3 ml-4 mb-1 placeholder-gray-600 border border-spacing-1 rounded-full w-full cursor-pointer" />
        </div>
        <div className="flex pt-2">
          <div onClick={() => setPost(true)} className="ml-16 flex cursor-pointer text-slate-500">
            <img src={question} className="w-5 h-5" alt="Ask" />
            <h1 className="ml-2 text-sm">Ask</h1>
          </div>
          <h1 className="ml-20  text-slate-500">|</h1>
          <div className="ml-16 flex">
            <img src={edit} className="w-5 h-5" alt="Answer" />
            <h1 className="ml-2 text-sm  text-slate-500">Answer</h1>
          </div>
          <h1 className="ml-20  text-slate-500">|</h1>
          <div onClick={() => setPost(true)} className="ml-16 flex cursor-pointer">
            <img src={pen} className="w-5 h-5" alt="Post" />
            <h1 className="ml-2 text-sm  text-slate-500">Post</h1>
          </div>
        </div>
      </div>

      {/* Displaying questions */}
      {questionData
  .map((data: any) => {
    return (
      <div key={data.id} className="bg-white rounded-lg mt-2 p-2 w-5/6">
        <div className="flex ">
          <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name="Shubham" />
          <h1 className="ml-3 mt-1 font-bold">{"Shubham"}</h1>
        </div>
        {data.title!=""&&<h1 className="mt-4 ml-2 font-bold " >{data?.title}</h1>}
        <div className="mt-2 ml-2 font-light">{data?.body}</div>
        <hr className="mt-1" />
        <div className="flex">
          <img
            src={comment}
            onClick={() => {
              if(data.id===questionId){
                setCommentToggle(!commentToggle);
              }else{
                setQuestionId(data?.id);
                setCommentToggle(true);
              }
              
            }}
            className="w-6 h-6 mt-2.5 cursor-pointer ml-3"
            alt="Comment"
          />
          <Link to="/answers"  state={{ id: data?.id }}>
          <div className="flex border border-spacing-1 p-1 mt-1.5 text-sm rounded-full mx-3 px-3 border-cyan-950">
          <img src={edit} className="w-4 h-4 mb-1 mr-1 mt-1 cursor-pointer"/>
            <button >Answers</button>
            </div>
          </Link>
        </div>

        {(data.id===questionId &&commentToggle) && (
          <div className="flex mt-3">
            <Avatar round size="25" className="mt-1 ml-1 cursor-pointer" name={"Rar "} />
            <input
              onChange={(e) => setAnswers(e.target.value)}
              placeholder="Add a comment"
              className="bg-zinc-100 p-2 pl-3 mb-2 ml-4 placeholder-gray-500  border border-spacing-1 rounded-full w-4/6 h-10"
            />
            <Link to="/answers" state={{ id: data?.id }}>
              <button
                onClick={() => {
                  addAnswer();
                  setCommentToggle(false);
                }}
                className="bg-blue-500 text-white rounded-full font-normal text-sm w-32 ml-3 mt-1 h-8"
              >
                Add comment
              </button>
            </Link>
          </div>
        )}
        <hr className="mt-1" />
      </div>
    );
  })}

      {post && <PostPopup setPost={setPost} />}
    </div>
  );
};

export default Answerbar;
