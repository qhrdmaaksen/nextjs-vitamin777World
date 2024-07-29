import VitaminNoticeItem from './VitaminNoticeItem';

function VitaminNoticeList(props) {
  return (
    <>
      <ul>
        {props.notices.map((notice) => (
          <VitaminNoticeItem
            key={notice.id}
            noticeTitle={notice.noticeTitle}
            noticeContent={notice.noticeContent}
          />
        ))}
      </ul>
    </>
  );
}

export default VitaminNoticeList;
