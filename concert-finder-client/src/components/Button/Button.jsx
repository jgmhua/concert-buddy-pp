import "./Button.scss";

export default function Button({ text, handleFunc, btnType }) {
	return (
		<button
			className={`btn ${btnType == "no-borders" ? "btn--no-borders" : ""}`}
			onClick={handleFunc}
		>
			{text}
		</button>
	);
}
