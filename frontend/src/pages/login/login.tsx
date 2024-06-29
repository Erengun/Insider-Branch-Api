import React from "react";

const Login: React.FC = () => {
	const [emailFocus , setEmailFocus] = React.useState<boolean>(false);
	return (
		<>
			<div className="w-full h-[100svh] bg-[#222222] flex justify-center items-center">
				<div className="w-full max-w-lg h-96 border border-white rounded-md flex flex-col justify-around items-center">
					<div className="w-11/12 relative">
						<label htmlFor="" className="absolute top-0 left-0 -translate-y-1/2 text-white">E-Mail</label>
						<input onFocus={() => {setEmailFocus(true)}} type="text" name="" id="" className="w-full h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4" />
					</div>
					<input type="text" name="" id="" className="w-11/12 h-16 bg-transparent border-b border-white focus:outline-none text-white pl-4" />
					<button>LOGIN</button>
				</div>
			</div>
		</>
	)
}

export default Login