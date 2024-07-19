import VitaminList from '../components/vitamins/VitaminList';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import RightSideBanner from '../components/banner/RightSideBanner';
import LeftSideBanner from '../components/banner/LeftSideBanner';
import AdminInputForm from '../components/vitamins/AdminInputForm';
import { getMongoUri } from '../config/db';
import VitaminKakaoMapsPage from '../components/vitamins/VitaminKakaoMapsPage';

const RightBannerImages = [
  '/util/3d-delicious-seasonal-fruits_23-2151046863.jpg',
  '/util/close-up-citrus-sesonal-fruits-winter_23-2151035447.jpg',
  '/util/close-up-futuristic-soft-drink_23-2151281958.jpg',
];
const LeftBannerImages = [
  '/util/raw-foodstuff-with-water-drops-studio_23-2151364890.jpg',
  '/util/view-abstract-fluid-monochrome-palette_23-2150635178.jpg',
  '/util/bottle-lemons-lemons-grapefruit-are-displayed-white-background_772785-16214.jpg',
];

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
      <RightSideBanner RightBannerImages={RightBannerImages} interval={4000} />
      <LeftSideBanner LeftBannerImages={LeftBannerImages} interval={4000} />
      <AdminInputForm />
      <VitaminKakaoMapsPage width="100%" height="500px" />
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
