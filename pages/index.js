import VitaminList from '../components/vitamins/VitaminList';
import { Fragment, useState } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import RightSideBanner from '../components/banner/RightSideBanner';
import LeftSideBanner from '../components/banner/LeftSideBanner';
import AdminInputForm from '../components/vitamins/AdminInputForm';
import { getMongoUrl } from '../config/db';
import VitaminSearchBox from '../components/vitamins/VitaminSearchBox';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../atoms/stateAtoms';
import VitaminDetail from '../components/vitamins/VitaminDetail';

function HomePage(props) {
  const [vitamins, setVitamins] = useState(props.vitamins);
  const [isLoggedIn] = useRecoilState(isLoggedInState);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 페이지당 제품 수 3 으로 설정

  // 현재 페이지에 해당하는 제품 리스트 계산
  const indexOfLastVitamin = currentPage * itemsPerPage;
  const indexOfFirstVitamin = indexOfLastVitamin - itemsPerPage;
  const currentVitamins = vitamins.slice(
    indexOfFirstVitamin,
    indexOfLastVitamin,
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(vitamins.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 페이지 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지 핸들러
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 처음 페이지로 이동하는 핸들러
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <Head>
        <title>vitamin777world Home</title>
        <meta
          name="description"
          content="vitamin, vitamins, health, multi vitamin, vitamins platform"
        />
      </Head>
      <VitaminSearchBox setVitamins={{ setVitamins }} />
      <RightSideBanner interval={4000} />
      <LeftSideBanner interval={4000} />
      <AdminInputForm />
      <VitaminDetail isLoggedIn={isLoggedIn} />
      <VitaminList vitamins={currentVitamins} />

      {/* 페이지 네비게이션 */}
      <div>
        <button onClick={handleFirstPage}>처음으로..</button>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          이전
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          다음
        </button>
      </div>
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
  const client = await MongoClient.connect(getMongoUrl());

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
