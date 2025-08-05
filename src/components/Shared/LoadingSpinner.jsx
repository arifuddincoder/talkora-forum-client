import { PuffLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
	return (
		<div
			className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex 
      flex-col 
      justify-center 
      items-center `}
		>
			<PuffLoader size={100} color="#FF6934" />
		</div>
	);
};

export default LoadingSpinner;
