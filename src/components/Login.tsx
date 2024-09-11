import React, { FC, useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import welcome from '../assets/welcome.jpg';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import Modal from './Modal';
import ForgotPasswordForm from './ForgotPassword';
import axios from "axios";
import { AuthObject } from '../App';
interface SignupData {
  email: string,
  pass: string,
  phone: string
}



interface LoginProps {
  auth: AuthObject;
  setAuth: React.Dispatch<React.SetStateAction<AuthObject>>;
}

const Login: FC<LoginProps> = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pass, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('99932433243');
  const [forgotPass, setForgotPass] = useState<boolean>(false);

  const auth2Handler = useCallback((url: string) => {
    window.location.href = url;
  }, []);

 
  const handleNormalLogin = useCallback(async () => {
   
    try {
      const resp = await axios.post('http://localhost:8080/auth/signin', {
        email: email,      
        pass: pass
      },{ withCredentials: true });

      if (resp.status === 200) { 
        setAuth({ userState: true, email: resp.data.email,userId:resp.data.userId }); 
        navigate('/login/home');
        // console.log(resp.status, resp.data);
      } else {
        console.log('Error:', resp.status);
      }
    } catch (e) {
      console.error('Error during login:', e);
    }
  }, [email, pass, navigate, setAuth]); // Added required dependencies

  const handleSignUp = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signupdata = new FormData(event.currentTarget);
    signupdata.set('phone', phone);
    const email = signupdata.get('email');
    const password = signupdata.get('password');

    try {
      const resp = await axios.post('http://localhost:8080/auth/signup', {
        email: email,
        pass: password,
        phone: phone
      });

      if (resp.status === 201) {
        console.log("Signup successful");
        navigate('/home1');
        setShowModal(false);
      } else {
        console.log("Signup failed with status:", resp.status);
      }
    } catch (e) {
      console.error("Error during signup:", e);
    }
  }, [phone, navigate]);

  return (
    <div
      className="bg-no-repeat bg-cover h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${welcome})` }}
    >
      <div className="bg-white h-11/12 w-7/12 rounded-sm p-8">
        <h1 className="text-red-700 text-6xl font-bold font-serif text-center">Quora</h1>
        <h1 className="text-center font-bold text-gray-500 mt-3">
          A place to share knowledge and better understand the world
        </h1>
        <div className="flex mt-10">
          <div>
            <h1 className="text-zinc-400 text-sm w-72">
              By continuing you indicate that you agree to Quora’s
              <span className="text-cyan-700">Terms of Service</span> and{' '}
              <span className="text-cyan-700">Privacy Policy.</span>
            </h1>
            <div
              onClick={() => auth2Handler('http://localhost:8080/oauth2/authorization/google')}
              className="cursor-pointer flex p-4 border border-spacing-1 items-center w-88 hover:bg-gray-200 rounded-sm mt-5"
            >
              <img src={google} alt="google_icon" className="w-5 h-5 ml-2 hover:bg-gray-200"></img>
              <h1 className="ml-7 hover:bg-gray-200">Continue with Google</h1>
            </div>
            <div
              onClick={() => auth2Handler('http://localhost:8080/oauth2/authorization/facebook')}
              className="cursor-pointer flex p-4 border border-spacing-1 items-center w-88 hover:bg-gray-200 rounded-sm mt-2"
            >
              <img src={facebook} alt="facebook_icon" className="w-5 h-5 ml-2 rounded-full hover:bg-gray-200"></img>
              <h1 className="ml-7 hover:bg-gray-200">Continue with Facebook</h1>
            </div>
            <h1
              className="text-center text-sm font-semibold text-zinc-600 mt-3 hover:bg-gray-200 rounded-full cursor-pointer p-1"
              onClick={() => setShowModal(true)}
            >
              Sign up with Email
            </h1>
          </div>
          <div className="ml-16">
            <h1>Login</h1>
            <hr className="w-72 mt-3"></hr>
            <h1 className="mt-4 font-semibold text-sm">Email</h1>
            <input
              placeholder="your email"
              className="border border-spacing-1 p-2 w-72 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input
            ></input>
            <h1 className="mt-4 font-semibold text-sm">Password</h1>
            <input
              placeholder="your password"
              className="border border-spacing-1 p-2 w-72 mt-2"
              value={pass}
              onChange={(e) => setPassword(e.target.value)} // Handle password input
            ></input>
            <div className="flex mt-4">
              <h1 className="text-zinc-400 text-sm mt-2 hover:underline cursor-pointer" onClick={() => setForgotPass(true)}>Forgot password ?</h1>
              <button className="bg-blue-500 text-white p-2 w-20 ml-24 rounded-full" onClick={handleNormalLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-3" />
        <h1 className="text-sm text-center mt-3 text-zinc-600">
          About . Careers . Privacy . Terms . Contact . Languages . Your . Ad . Choices . Press© Quora, Inc. 2024
        </h1>
      </div>
      {showModal && <Modal show={showModal} handleClose={() => setShowModal(false)} handleSignUp={handleSignUp} />}
      {forgotPass && <ForgotPasswordForm showForgotPass={forgotPass} handleClose={() => setForgotPass(false)} />}
    </div>
  );
};

export default Login;
