import Button from 'react-bootstrap/Button';
import VitaminNoticeModal from '../../components/vitamins/VitaminNoticeModal';
import VitaminNoticeList from '../../components/vitamins/VitaminNoticeList';
import {getMongoUrl} from '../../config/db';
import {MongoClient} from 'mongodb';
import {useRecoilState} from "recoil";
import {noticeModalShowState} from "../../atoms/stateAtoms";

function VitaminNoticePage(props) {
  const [noticeModalShow, setNoticeModalShow] = useRecoilState(noticeModalShowState);

  function handleNoticeModalShow() {
    console.log('handleNoticeModalShow');
    setNoticeModalShow(true);
  }

  function handleNoticeModalHide() {
    setNoticeModalShow(false);
  }

  return (
    <>
      <VitaminNoticeList notices={props.notices} />
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

export async function getStaticProps() {
  const client = await MongoClient.connect(getMongoUrl());

  const db = client.db();
  const noticesCollection = db.collection('notices');

  const notices = await noticesCollection.find().toArray();

  await client.close();

  return {
    props: {
      notices: notices.map((notice) => ({
        noticeTitle: notice.noticeTitle,
        noticeContent: notice.noticeContent,
        id: notice._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default VitaminNoticePage;
