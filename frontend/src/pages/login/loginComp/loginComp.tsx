import axios from 'axios';
import React from "react";
import { useNavigate } from "react-router-dom";


const LoginComp: React.FC = () => {
  // Set Change Animation State For Email Input
  const [emailFocus, setEmailFocus] = React.useState<boolean>(false);
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);
  const [emailInputData, setEmailInputData] = React.useState<string>("");

  // Set Change Animation State For Password Input
  const [passwordFocus, setPasswordFocus] = React.useState<boolean>(false);
  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);
  const [passwordInputData, setPasswordInputData] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const handleLogin = async () => {
    console.log(import.meta.env.VITE_API_BASE);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE}/users/login`, {
        email: emailInputData,
        password: passwordInputData
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      localStorage.setItem('access-token' , response.data.accessToken);
      localStorage.setItem('role' , response.data.role);
      navigate('/home');
    }catch (e){
      console.error(`Error While Login => ${e}`)
    }
  }

  const navigate = useNavigate();
  return (
    <>
      <div className={`absolute inset-0 w-full h-96 border border-white rounded-md flex flex-col justify-around items-center`}>
        <div className="w-11/12 relative">
          <label onClick={(() => {
            if (emailInputRef && emailInputRef.current) {
              emailInputRef.current.focus();
            }
          })} htmlFor="" className={`absolute  left-0 -translate-y-1/2 select-none cursor-text ${emailFocus ? 'top-0 pl-0 text-sm text-white' : ' top-1/2 pl-4 text-2xl text-white/50'} transition-all duration-300`}>E-Mail</label>
          <input ref={emailInputRef}
            onFocus={() => { setEmailFocus(true) }}
            onBlur={(e) => { setEmailFocus(e.target.value.length > 0) }}
            onChange={(e) => { setEmailInputData(e.target.value) }}
            type="email"
            name=""
            id=""
            className={`w-full h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4`} />
        </div>

        <div className="w-11/12 relative flex">
          <label onClick={(() => {
            if (passwordInputRef && passwordInputRef.current) {
              passwordInputRef.current.focus();
            }
          })} htmlFor="" className={`absolute  left-0 -translate-y-1/2 select-none cursor-text ${passwordFocus ? 'top-0 pl-0 text-sm text-white' : ' top-1/2 pl-4 text-2xl text-white/50'} transition-all duration-300`}>Password</label>
          <input ref={passwordInputRef}
            onFocus={() => { setPasswordFocus(true) }}
            onBlur={(e) => { setPasswordFocus(e.target.value.length > 0) }}
            onChange={(e) => { setPasswordInputData(e.target.value) }}
            type={showPassword ? "text" : "password"}
            name=""
            id="" className={`w-full h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4`} />
          <button onClick={() => { setShowPassword(prev => !prev) }} className="text-white fill-white border-b border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="white" d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48l1.3-.75l-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 7L4 8.47L3.15 7l-1.3.75l.85 1.47H1v1.5h1.7l-.85 1.48zm6.7-.75l1.3.75l.85-1.48l.85 1.48l1.3-.75l-.85-1.48H15v-1.5h-1.7l.85-1.47l-1.3-.75L12 8.47L11.15 7l-1.3.75l.85 1.47H9v1.5h1.7zM23 9.22h-1.7l.85-1.47l-1.3-.75L20 8.47L19.15 7l-1.3.75l.85 1.47H17v1.5h1.7l-.85 1.48l1.3.75l.85-1.48l.85 1.48l1.3-.75l-.85-1.48H23z" /></svg>
          </button>

        </div>

        <button
          disabled={!(emailInputData.length >= 1 && passwordInputData.length >= 1)}
          onClick={handleLogin}
          className={`w-11/12 bg-white bg-white h-10 rounded-sm ${!(emailInputData.length >= 1 && passwordInputData.length >= 1) ? ' opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}>LOGIN</button>
      </div>
    </>
  )
}

export default LoginComp