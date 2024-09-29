import VitaminList from '../components/vitamins/VitaminList';
import { Fragment, useState } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { getMongoUrl } from '../config/db';
import classes from './HomePage.module.css';

const HomePage = (props) => {
  const [vitamins, setVitamins] = useState(props.vitamins);
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

  // 현재 페이지를 기준으로 보여줄 페이지 범위 계산
  const startPage =
    Math.floor((currentPage - 1) / itemsPerPage) * itemsPerPage + 1;
  const endPage = Math.min(startPage + itemsPerPage - 1, totalPages);

  return (
    <>
      <Head>
        <title>vitamin777world Home</title>
        <meta
          name="description"
          content="vitamin, vitamins, health, multi vitamin, vitamins platform"
        />
      </Head>
      <div className={classes.homeContainer}>
        <div>
          <VitaminList vitamins={currentVitamins} />
          {/* 페이지 네비게이션 */}
          <div className={classes.navigation}>
            <button className={classes.buttonFirst} onClick={handleFirstPage}>
              처음으로..
            </button>
            <button
              className={classes.buttonPrevious}
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              이전
            </button>
            {/* 현재 페이지 기준으로 3개 페이지 버튼 생성*/}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                className={`${classes.pageButton} ${currentPage === startPage + index ? classes.active : ''}`}
                onClick={() => handlePageChange(startPage + index)}
              >
                {startPage + index}
              </button>
            ))}
            <button
              className={classes.buttonNext}
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/*export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            vitamins: DUMMY_VITAMINS
        }
    }
}*/

export const getStaticProps = async () => {
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
};

export default HomePage;
