import VitaminNoticeItem from './VitaminNoticeItem';

const VitaminNoticeList = (props) => {
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
};

export default VitaminNoticeList;
