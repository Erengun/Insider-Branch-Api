import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  loginPageState : string,
}

const RegisterComp: React.FC<Props> = ({loginPageState}) => {
  // Set Change Animation State For Email Input
  const [emailFocus, setEmailFocus] = React.useState<boolean>(false);
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);

  // Set Change Animation State For Password Input
  const [passwordFocus, setPasswordFocus] = React.useState<boolean>(false);
  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  return (
    <>
      <div className={`absolute inset-0 w-full h-96 border border-white rounded-md flex flex-col justify-around items-center ${loginPageState == "LOGIN" ? "translate-x-[-500%]" : "translate-x-0"} transition-all duration-300`}>
        <div className="w-11/12 relative">
          <label onClick={(() => {
            if (emailInputRef && emailInputRef.current) {
              emailInputRef.current.focus();
            }
          })} htmlFor="" className={`absolute  left-0 -translate-y-1/2 select-none cursor-text ${emailFocus ? 'top-0 pl-0 text-sm text-white' : ' top-1/2 pl-4 text-2xl text-white/50'} transition-all duration-300`}>E-Mail</label>
          <input ref={emailInputRef}
            onFocus={() => { setEmailFocus(true) }}
            onBlur={(e) => { setEmailFocus(e.target.value.length > 0) }}
            type="mail"
            name=""
            id=""
            className={`w-full h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4`} />
        </div>

        <div className="w-11/12 relative">
          <label onClick={(() => {
            if (passwordInputRef && passwordInputRef.current) {
              passwordInputRef.current.focus();
            }
          })} htmlFor="" className={`absolute  left-0 -translate-y-1/2 select-none cursor-text ${passwordFocus ? 'top-0 pl-0 text-sm text-white' : ' top-1/2 pl-4 text-2xl text-white/50'} transition-all duration-300`}>Password</label>
          <input ref={passwordInputRef}
            onFocus={() => { setPasswordFocus(true) }}
            onBlur={(e) => { setPasswordFocus(e.target.value.length > 0) }}
            type="password"
            name=""
            id="" className={`w-full h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4`} />

        </div>

        <button onClick={() => {navigate('/home')}}
                className="w-11/12 bg-white bg-white h-10 rounded-sm">REGISTER</button>
      </div>
    </>
  )
}

export default RegisterComp