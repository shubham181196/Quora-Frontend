import Login from "./components/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Leftbar from "./components/Leftbar";
export default function App () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login/home" element={<Home/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}
