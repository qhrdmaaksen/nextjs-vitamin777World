import Card from '../ui/Card';
import VitaminNoticeModal from '../../public/utils/VitaminNoticeModal';
import { showModalState } from '../../atoms/stateAtoms';
import { useRecoilState } from 'recoil';

const VitaminNoticeItem = (props) => {
  const [showModal, setShowModal] = useRecoilState(showModalState);
  return (
    <>
      <ul>
        <li>
          <Card>
            <div>{props.noticeTitle}</div>
            <div>{props.noticeContent}</div>
            <button variant="link" onClick={() => setShowModal(true)}>
              자세히 보기
            </button>
          </Card>
        </li>
      </ul>
      <VitaminNoticeModal
        title=""
        content=""
        show={showModal}
        heading=""
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default VitaminNoticeItem;
