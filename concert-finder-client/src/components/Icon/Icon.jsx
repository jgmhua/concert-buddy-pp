import "./Icon.scss";

//FIXME: FILL PATH ISN'T WORKING... 

export default function Icon({ icon, handleFunc, height, width, fill }) {
	return (
        <svg
        className="icon"
			xmlns="http://www.w3.org/2000/svg"
			height={height ?? "24px" }
			width={width ?? "24px" }
			viewBox="0 -960 960 960"
			onClick={handleFunc}
		>
			<path d={icon} fill={fill ?? "#be29578" }/>
		</svg>
	);
}
