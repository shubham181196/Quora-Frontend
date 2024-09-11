import { FC, useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import { Rightbar } from "./Rightbar";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthObject } from "../App";

type homeCompType = {
  search: string,
  menu: string,
  setMenu: React.Dispatch<React.SetStateAction<string>>,
  auth: AuthObject,
  setAuth: React.Dispatch<React.SetStateAction<AuthObject>>
};

const Home: FC<homeCompType> = (props: homeCompType) => {
  const navigate = useNavigate();
  const [questionId, setQuestionId] = useState<string>("");

  const getCurrUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/currentuser", { withCredentials: true });

      if (response.status === 200) {
        const data = response.data;
        console.log(data.email);
        props.setAuth({
          userState: true,
          email: data.email,
          userId: data.userId
        });
      } else {
        // Handle case where user is not authenticated
        navigate("/");
      }
    } catch (e) {
      console.log("Current user API failed", e);
      navigate("/");
    }
  };

  useEffect(() => {
    getCurrUser();
  }, []);

  return (
    <>
      <Navbar setSearch={"hi"} />
      <div className="h-full w-screen bg-gray-100 grid grid-cols-6">
        <div>
          <Leftbar setMenu={props.setMenu} />
        </div>
        <div className="col-span-3">
          <Rightbar
            search={props.search}
            menu={props.menu}
            questionId={questionId}
            setQuestionId={setQuestionId}
            auth={props.auth}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
