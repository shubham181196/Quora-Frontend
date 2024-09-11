import React, { useState } from "react";
import axios from "axios";
import { AuthObject } from "../App";
// Types for component props
type dialogProp= {
  onClose: () => void;
  auth:AuthObject,
  questionData:any
}

// Main component
const AskPostDialog: React.FC<dialogProp> = (props:dialogProp) => {
  // States to handle tabs and inputs
  const [activeTab, setActiveTab] = useState<"question" | "post">("question");
  const [questionText, setQuestionText] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  // Handlers for form submission
  const handleQuestionSubmit = async() => {
    const resp=await axios.post(`http://localhost:8083/api/v1/questions`,
        {
            userId:props.auth.userId,
            title:questionText,
            body:"no body",
            Topics:["spring"]
        },{withCredentials:true});
    console.log("Post Submitted:", postText);
    if(resp.status===201) {
        console.log(resp.data);
        props.onClose();
        props.questionData.push({
            id:resp.data.id,
            title:resp.data.title,
            body:resp.data.body,
            count:0,
            userLiked:false
        });
    }
    else console.log("request failed");
  };

  const handlePostSubmit = async () => {
    // Close modal after submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white  p-4 rounded-md shadow-md w-5/12 h-4/6">
        {/* Tabs for switching between question and post */}
        <div className="">✕</div>
        <div className="flex justify-around mb-4">
          <button
            onClick={() => setActiveTab("question")}
            className={`px-1 py-2 ${activeTab === "question" ? "border-b-2 border-blue-500" : ""}`}
          >
            Add Question
          </button>
          <button
            onClick={() => setActiveTab("post")}
            className={`px-1 py-2 ${activeTab === "post" ? "border-b-2 border-blue-500" : ""}`}
          >
            Create Post
          </button>
        </div>

        {/* Render form based on active tab */}
        {activeTab === "question" ? (
          <div >
            <div className="mb-4 p-3 rounded-md bg-blue-100 ">
              <p className="text-base pl-1 text-blue-500 font-semibold">
                Tips on getting good answers quickly:
              </p>
              <ul className="text-sm text-blue-500 list-disc pl-5  ">
                <li>Make sure your question has not been asked already</li>
                <li>Keep your question short and to the point</li>
                <li>Double-check grammar and spelling</li>
              </ul>
            </div>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Start your question with 'What', 'How', 'Why', etc."
              className="w-full h-11 p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={props.onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleQuestionSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Add Question
              </button>
            </div>
          </div>
        ) : (
          <div>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Say something..."
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={props.onClose} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handlePostSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskPostDialog;
