import './EventModal.css';
const EventModal = ({ children, isOpen, closeModal }: any | void) => {
	const handleModalContainerClick = (event: React.MouseEvent<HTMLElement>) =>
		event.stopPropagation();
	return (
		<article  className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
			<div className="modal-container" onClick={handleModalContainerClick}>
				<button className="modal-close" onClick={closeModal}>
					X
				</button>
				{children}
			</div>
		</article>
	);
};

export default EventModal;
