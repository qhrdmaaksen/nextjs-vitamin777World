import { useRef } from 'react';
import Card from '../ui/Card';

const VitaminNoticeForm = (props) => {
  const noticeTitleInputRef = useRef();
  const noticeContentInputRef = useRef();

  const noticeSubmitHandler = (e) => {
    e.preventDefault();

    const enteredNoticeTitle = noticeTitleInputRef.current.value;
    const enteredNoticeContent = noticeContentInputRef.current.value;

    const vitaminNoticeData = {
      noticeTitle: enteredNoticeTitle,
      noticeContent: enteredNoticeContent,
    };

    props.onAddNotice(vitaminNoticeData);
  };

  return (
    <>
      <Card>
        <form onSubmit={noticeSubmitHandler}>
          <div>
            <label htmlFor="noticeTitle">제목</label>
            <input
              type="text"
              required
              id="noticeTitle"
              ref={noticeTitleInputRef}
            />
          </div>
          <div>
            <label htmlFor="noticeContent">내용</label>
            <input
              type="text"
              required
              id="noticeContent"
              ref={noticeContentInputRef}
            />
          </div>
          <button>등록</button>
        </form>
      </Card>
    </>
  );
};
export default VitaminNoticeForm;
