import React from "react";
import LoginComp from "./loginComp/loginComp";
import RegisterComp from "./RegisterComp/registerComp";

const Login: React.FC = () => {

	return (
		<>
			<div className="w-full h-[100svh] bg-[#222222] flex flex-col gap-y-4 justify-center items-center overflow-hidden">
				<div className="flex w-full max-w-lg h-96 relative">
					{/* LOGIN */}
					<LoginComp/>
				</div>
			</div>
		</>
	)
}

export default Login