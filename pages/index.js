import VitaminList from '../components/vitamins/VitaminList';
import {Fragment} from 'react';
import {MongoClient} from 'mongodb';
import Head from 'next/head';
import RightSideBanner from '../components/banner/RightSideBanner';
import LeftSideBanner from '../components/banner/LeftSideBanner';
import AdminInputForm from '../components/vitamins/AdminInputForm';
import {getMongoUri} from '../config/db';


function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>vitamin777world Home</title>
        <meta
          name="description"
          content="vitamin, vitamins, health, multi vitamin, vitamins platform"
        />
      </Head>
      <RightSideBanner interval={4000} />
      <LeftSideBanner interval={4000} />
      <AdminInputForm />
      <VitaminList vitamins={props.vitamins} />
    </Fragment>
  );
}

/*export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            vitamins: DUMMY_VITAMINS
        }
    }
}*/

export async function getStaticProps() {
  // nextJS 에서 서버 측 코드에서 fetch 를 사용할 수 있도록 기능 추가
  const client = await MongoClient.connect(getMongoUri());

  const db = client.db();
  const vitaminsCollection = db.collection('vitamins');

  const vitamins = await vitaminsCollection.find().toArray();

  await client.close();

  return {
    props: {
      vitamins: vitamins.map((vitamin) => ({
        title: vitamin.title,
        address: vitamin.address,
        image: vitamin.image,
        id: vitamin._id.toString(),
      })),
    },
    revalidate: 1, // 1초마다 pre-rendering
  };
}

export default HomePage;
