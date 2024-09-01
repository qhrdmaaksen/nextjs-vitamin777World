import VitaminDetail from '../../components/vitamins/VitaminDetail';
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
import { getMongoUrl } from '../../config/db';
import { isLoggedInState } from '../../atoms/stateAtoms';
import { useRecoilValue } from 'recoil';

const VitaminDetails = (props) => {
  const { vitaminData } = props;
  const isLoggedIn = useRecoilValue(isLoggedInState);

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
        id={vitaminData.id}
        image={vitaminData.image}
        title={vitaminData.title}
        address={vitaminData.address}
        description={vitaminData.description}
        isLoggedIn={isLoggedIn}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
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
};

/*
 * getStaticProps 는 nextJS 에서 제공하는 함수로, 페이지 빌드 시 실행되며 정적 데이터 생성
 * getStaticProps 함수는 비동기적으로 실행되며, context 객체를 인자로 받음,context 객체에는 현재 페이지에 대한 정보가 포함되어 있음
 * */
export const getStaticProps = async (context) => {
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

  //selectedVitamin 이 없는 경우, notFound: true 를 반환하여 404 페이지를 표시
  if (!selectedVitamin) {
    return {
      notFound: true,
    };
  }

  //client.close()를 통해 MongoDB 클라이언트 연결을 닫음
  await client.close();

  return {
    props: {
      vitaminData: {
        id: selectedVitamin._id.toString(),
        image: selectedVitamin.image || '', //이미지가 없는 경우 빈 문자열 반환
        title: selectedVitamin.title,
        address: selectedVitamin.address,
        description: selectedVitamin.description,
      },
    },
  };
};

export default VitaminDetails;
