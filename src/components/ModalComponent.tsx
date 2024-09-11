import axios from "axios";
import { FC,useState } from 'react';
import { AuthObject } from "../App";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId:string;
  questionTitle:string
  auth:AuthObject
}

export const ModalComponent:FC<ModalProps> = ({ isOpen, onClose ,questionId,questionTitle,auth}) => {
  if (!isOpen) return null;
  const [ans,setAns]=useState<string>("");
  
  const postAnswer = async () => {
    try {
        console.log(questionId);
        if (questionId !== null) {
           
            const resp = await axios.post(
                `http://localhost:8083/api/v1/questions/${questionId}/answers`,
                {
                    userId: auth?.userId,
                    text: ans
                },
                {withCredentials: true }
            );

            if (resp.status === 200) {
                console.log("Success: API call successful");
                onClose();
            }
        }
    } catch (error) {
        console.log("Error: " + error);
    }
};

  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      {/* Modal content */}
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold"
          >
            ✕
          </button>
        </div>

        {/* User details */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Placeholder for avatar */}
            <span className="text-white text-lg">U</span>
          </div>
          <div className="ml-3">
            <p className="font-semibold">Shubham Chattree</p>
            <button className="text-blue-500 text-sm">Choose credential</button>
          </div>
        </div>

        {/* Question */}
        <p className="font-bold text-lg mb-3">{questionTitle}</p>

        {/* Answer input area */}
        <textarea
          className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
          placeholder="Write your answer"
          onChange={(e)=>{
            setAns(e.target.value);
            
          }}
        />

        {/* Post button */}
        <div className="flex justify-end mt-3">
          <button className={`px-6 py-2 rounded-full font-medium ${
              ans.trim() === '' 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' // Disabled state
                : 'bg-blue-500 text-white hover:bg-blue-600' // Enabled state
            }`}
            disabled={ans.trim() === ''} onClick={postAnswer} >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

