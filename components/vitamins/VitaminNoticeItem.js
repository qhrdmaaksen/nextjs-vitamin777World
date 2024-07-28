import Card from '../ui/Card';

function VitaminNoticeItem(props) {
  return (
    <>
      <ul>
        <li>
          <Card>
            <div>
                {props.noticeTitle}
            </div>
              <div>
                {props.noticeContent}
              </div>
              <button onClick={noticeModalOpen}>보기</button>
          </Card>
        </li>
      </ul>
    </>
  );
}

export default VitaminNoticeItem;
