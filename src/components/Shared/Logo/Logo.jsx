import React from "react";
import logoImg from "../../../assets/logo.png";
const Logo = ({ IsHiddenLogoTextOnSm = true }) => {
	return (
		<div className="flex items-center gap-2.5">
			<div>
				<img src={logoImg} alt="Talkora official logo" className="w-10 h-10 object-cover" />
			</div>
			<h3 className={`text-[#FF4401] text-[26px] font-bold ${IsHiddenLogoTextOnSm ? "hidden sm:flex" : "flex"}`}>
				Talkora<span className="text-[#192351]">.</span>
			</h3>
		</div>
	);
};

export default Logo;
