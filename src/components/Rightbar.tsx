import Avatar from "react-avatar";
import question from "../assets/question.png";
import pen from "../assets/pen.png";
import edit from "../assets/edit.png";
import { useEffect, useState } from "react";
import AskPostDialog from "./AskPostDialog";
import PostPopup from "./PostPopup";
import { ModalComponent } from "./ModalComponent";
import axios from "axios";
import { AuthObject } from "../App";
import like from "../assets/like_icon.png";
import flike from "../assets/like-filled.svg";

type searchProp = {
  search: any,
  menu: any,
  questionId: string,
  auth: AuthObject,
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
};

export const Rightbar = (props: searchProp) => {
  const [questionData, setQuestionData] = useState<any>([]);
  const [answers, setAnswers] = useState("");
  // const [post, setPost] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenModal = (id: string) => {
    props.setQuestionId(id);
    setIsModalOpen(true);
  };

  const handleLikeToggle = async (id: string, userLiked: boolean) => {
    const resp = await likeCall(id, !userLiked);
    if (resp) {
      setQuestionData((prevData: any[]) =>
        prevData.map((item: any) =>
          item.id === id ? { ...item, userLiked: !userLiked } : item
        )
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const likeCall = async (id: string, likeToggle: boolean) => {
    if (!props.auth.userId) {
      console.error('User ID is missing');
      return false;
    }

    try {
      const resp = await axios.post(
        `http://localhost:8083/api/v1/like/questions/${id}?likeaction=${likeToggle}`,
        { userId: props.auth.userId },
        { withCredentials: true }
      );

      return resp.status === 200;
    } catch (error) {
      console.error('Error occurred while toggling like:', error);
      return false;
    }
  };

  const getQuestion = async () => {
    if (!props.auth.userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8083/api/v1/questions/${props.auth.userId}`, { withCredentials: true });
      setQuestionData(response.data);
      console.log(response.data); // Assuming the API returns an array of questions
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.auth.userId) {
      getQuestion();
    }
  }, [props.auth.userId]);

  return (
    <div className="p-2">
      <div className="bg-white p-2 h-24 rounded-lg border border-spacing-1 w-5/6">
        <div className="flex mt-2">
          <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name="to be placed" />
          <input
            onClick={() => setShowDialog(true)}
            placeholder="What do you want to ask or share?"
            className="bg-zinc-100 p-1 pl-3 ml-4 mb-1 placeholder-gray-600 border border-spacing-1 rounded-full w-full cursor-pointer"
          />
        </div>
        <div className="flex pt-2">
          <div onClick={() => setShowDialog(true)} className="ml-16 flex cursor-pointer text-slate-500">
            <img src={question} className="w-5 h-5" alt="Ask" />
            <h1 className="ml-2 text-sm">Ask</h1>
          </div>
          <h1 className="ml-20 text-slate-500">|</h1>
          <div className="ml-16 flex">
            <img src={edit} className="w-5 h-5" alt="Answer" />
            <h1 className="ml-2 text-sm text-slate-500">Answer</h1>
          </div>
          <h1 className="ml-20 text-slate-500">|</h1>
          <div onClick={() => setShowDialog(true)} className="ml-16 flex cursor-pointer">
            <img src={pen} className="w-5 h-5" alt="Post" />
            <h1 className="ml-2 text-sm text-slate-500">Post</h1>
          </div>
        </div>
      </div>

      {/* Displaying questions */}
      {questionData.map((data: any) => (
        <div key={data.id} className="bg-white rounded-lg mt-2 p-2 w-5/6">
          <div className="flex">
            <Avatar round size="25" className="mt-0.5 ml-1 cursor-pointer" name="Shubham" />
            <h1 className="ml-3 mt-1 font-bold">{"Shubham"}</h1>
          </div>
          {data.title !== "" && <h1 className="mt-4 ml-2 font-bold">{data?.title}</h1>}
          <div className="mt-2 ml-2 font-light">{data?.body}</div>
          <hr className="mt-1" />
          <div className="flex">
            <img
              src={data.userLiked ? flike : like}
              onClick={async () => {
                if (data.id === props.questionId) {
                  await handleLikeToggle(data.id, data.userLiked);
                } else {
                  await props.setQuestionId(data.id);
                  await handleLikeToggle(data.id, data.userLiked);
                }
              }}
              className="w-4 h-4 mt-3.5 cursor-pointer ml-3"
              alt="Like"
            />
            <div>
              <div className="flex border border-spacing-1 p-1 mt-1.5 text-sm rounded-full mx-3 px-3 border-cyan-950">
                <img src={edit} className="w-4 h-4 mb-1 mr-1 mt-1 cursor-pointer" />
                <button onClick={() => handleOpenModal(data?.id)}>Answer</button>
              </div>
            </div>
          </div>

          <hr className="mt-1" />
          {isModalOpen && (
            <ModalComponent
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              questionId={props.questionId}
              questionTitle={data?.title}
              auth={props.auth}
            />
          )}
        </div>
      ))}
      {showDialog && <AskPostDialog onClose={() => setShowDialog(false)} auth={props.auth} questionData={questionData}/>}
      {/* {post && <PostPopup setPost={setPost} />} */}
    </div>
  );
};
