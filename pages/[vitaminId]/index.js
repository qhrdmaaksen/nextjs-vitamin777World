import VitaminDetail from '../../components/vitamins/VitaminDetail';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import { getMongoUrl } from '../../config/db';

function VitaminDetails(props) {
  const { vitaminData } = props;
  if (!vitaminData) {
    return <p>loading...</p>;
  }
  return (
    <Fragment>
      <Head>
        <title>{vitaminData.title}</title>
        <meta name="description" content={vitaminData.description} />
      </Head>
      <VitaminDetail
        image={vitaminData.image}
        title={vitaminData.title}
        address={vitaminData.address}
        description={vitaminData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(getMongoUrl());

  const db = client.db();
  const vitaminsCollection = db.collection('vitamins');

  // 객체중에 id 만 가져오기
  const vitamins = await vitaminsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  await client.close();

  return {
    /*blocking - 페이지가 미리 생성될때까지 사용자는 아무것도 볼 수 없고 완성된 페이지 제공*/
    fallback: 'blocking',
    paths: vitamins.map((vitamin) => ({
      params: { vitaminId: vitamin._id.toString() },
    })),
  };
}

/*
 * getStaticProps 는 nextJS 에서 제공하는 함수로, 페이지 빌드 시 실행되며 정적 데이터 생성
 * getStaticProps 함수는 비동기적으로 실행되며, context 객체를 인자로 받음,context 객체에는 현재 페이지에 대한 정보가 포함되어 있음
 * */
export async function getStaticProps(context) {
  //vitaminId는 context.params.vitaminId에서 가져온 것으로, 현재 페이지의 URL 경로에서 추출된 vitamin ID
  const vitaminId = context.params.vitaminId;

  // vitaminId 유효성 검사
  if (!ObjectId.isValid(vitaminId)) {
    return {
      notFound: true,
    };
  }

  // MongoClient.connect()를 통해 MongoDB Atlas 클러스터에 연결,연결 문자열에는 사용자 이름, 비밀번호, 데이터베이스 이름 등이 포함
  const client = await MongoClient.connect(getMongoUrl());

  const db = client.db();
  //db.collection('vitamins')를 통해 'vitamins' 컬렉션을 가져옴
  const vitaminsCollection = db.collection('vitamins');
  //vitaminsCollection.findOne({_id: new ObjectId(vitaminId)})를 통해 특정 vitamin ID에 해당하는 문서를 가져옴
  const selectedVitamin = await vitaminsCollection.findOne({
    _id: new ObjectId(vitaminId),
  });
  //client.close()를 통해 MongoDB 클라이언트 연결을 닫음
  await client.close();

  return {
    props: {
      vitaminData: {
        id: selectedVitamin._id.toString(),
        image: selectedVitamin.image,
        title: selectedVitamin.title,
        address: selectedVitamin.address,
        description: selectedVitamin.description,
      },
    },
  };
}

export default VitaminDetails;
