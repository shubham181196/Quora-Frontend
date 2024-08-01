import Login from "./components/Login";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
export default function App () {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/login/home" element={<Navbar/>}/>
    </Routes>
    </BrowserRouter>
  )
}
