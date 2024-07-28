import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import VitaminNoticeModal from '../../components/vitamins/VitaminNoticeModal';

function VitaminNoticePage() {
  const [noticeModalShow, setNoticeModalShow] = useState(false);

  function handleNoticeModalShow() {
    console.log('handleNoticeModalShow');
    setNoticeModalShow(true);
  }

  function handleNoticeModalHide() {
    setNoticeModalShow(false);
  }

  return (
    <>
      <Button variant="primary" onClick={handleNoticeModalShow}>
        launch vertically centered modal
      </Button>
      <VitaminNoticeModal
        show={noticeModalShow}
        onHide={handleNoticeModalHide}
        title="Vitamin notice"
        heading="Important Information"
        content="Vitamins are essential nutrients that your body needs to function properly. They play a crucial role in various bodily processes, including metabolism, immune function, and cell growth."
      />
    </>
  );
}
export default VitaminNoticePage;
