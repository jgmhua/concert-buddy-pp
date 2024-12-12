import "./Button.scss";

export default function Button({ text, handleFunc }) {
	return (
			<button className="btn" onClick={handleFunc}>{text}</button>
	);
}
