import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const VitaminNoticeModal = ({
  show,
  onHide,
  title,
  heading,
  content,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{heading}</h4>
        <p>
          {content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default VitaminNoticeModal;
