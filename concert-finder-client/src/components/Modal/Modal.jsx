import "./Modal.scss";

export default function Modal({ setShowModal, modalContent, title, children }) {
	return (
		<section className="modal">
			<div className="modal__content">
				<span
					className="material-symbols-outlined modal__close"
					onClick={() => setShowModal(false)}
				>
					close
				</span>
				{/* TODO: include some sort of image */}
				<h3 className="modal__title">{title}</h3>
				<div className="modal__details">{children}</div>
			</div>
		</section>
	);
}
