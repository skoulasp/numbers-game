import PropTypes from "prop-types";

const Modal = ({ title, text, openInfoModal, modalExitAnimation }) => {
    console.log(openInfoModal);
    return (
        <div className={`modal-overlay ${modalExitAnimation ? "fadeOut" : "show-modal"}`}>
            <div className={`modal ${modalExitAnimation ? "hide-modal" : "show-modal"}`}>
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-content">
                    <p>{text}</p>
                </div>
                <div className="modal-footer">
                    <button className="close-button" onClick={openInfoModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.node.isRequired,
    openInfoModal: PropTypes.func.isRequired,
    modalExitAnimation: PropTypes.bool.isRequired,
};

export default Modal;
