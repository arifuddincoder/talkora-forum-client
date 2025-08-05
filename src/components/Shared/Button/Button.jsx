import React from "react";

const Button = ({ label, onClick, type = "button", className = "" }) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`
        bg-orange-500
        hover:bg-orange-600
        text-white
        font-semibold
        px-6
        py-2
        rounded-lg
        transition
        duration-200
        ${className}
      `}
		>
			{label}
		</button>
	);
};

export default Button;
