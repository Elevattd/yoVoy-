const EventModal = ({ children, isOpen, closeModal }: any | void) => {
	const handleModalContainerClick = (event: React.MouseEvent<HTMLElement>) =>
		event.stopPropagation();
	return (
		<article className={`modal ${isOpen && 'is-open'}`}>
			<div className="modal-container" onClick={handleModalContainerClick}>
				{children}
			</div>
		</article>
	);
};

export default EventModal;
