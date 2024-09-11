import Login from "./components/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import { useState } from "react";
import { Answer } from "./components/Answer";
export type AuthObject = {
  userState: boolean;
  email: string | null;
  userId:string
}
export type searchProp = {
  search:any
  menu:string,
  setMenu:React.Dispatch<React.SetStateAction<string>>
}
export default function App () {
  const [auth,setAuth]=useState<AuthObject>({userState:false,email:"",userId:""});
  const [menu,setMenu] = useState<string>("");
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login auth={auth} setAuth={setAuth}/>}/>
      <Route path="/login/home" element={<Home search={"aa"} menu={menu} setMenu={setMenu} auth={auth} setAuth={setAuth}/>}/>
      <Route path="/answers" element={<Answer search={"aa"} menu={menu} setMenu={setMenu}/>}/>
    </Routes>
    </BrowserRouter>
  )
}
