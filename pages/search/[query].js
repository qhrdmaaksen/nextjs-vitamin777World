/*왜?: Next.js의 Head 컴포넌트를 가져옵니다.
이유: HTML 문서의 <head> 섹션에 메타데이터를 추가하여 SEO와 페이지의 정보를 설정하기 위해 필요합니다.*/
import Head from 'next/head';
/*왜?: 비타민 목록을 표시하는 컴포넌트를 가져옵니다.
이유: 검색 결과를 사용자에게 표시하기 위해 비타민 목록을 렌더링하는 컴포넌트가 필요합니다.*/
import VitaminList from '../../components/vitamins/VitaminList';
import { getMongoUrl } from '../../config/db';
import { MongoClient } from 'mongodb';

/*
 *구분:	pages/search/[query].js
 *역할:	동적 페이지
 *목적:		검색어에 대한 결과 페이지 렌더링
 *데이터 처리 방식:	서버 측에서 검색어에 대한 데이터를 미리 가져오기
 *응답 형식:		HTML 페이지로 결과 표시
 * */

/*왜?: 검색 페이지 컴포넌트를 정의합니다.
이유: 이 컴포넌트는 검색 결과와 검색어를 props 로 받아서 렌더링합니다.*/
const SearchPage = ({ vitamins, query }) => {
  return (
    <>
      {/*Head
      왜?: 페이지의 메타데이터를 정의하기 위해 Head 컴포넌트를 사용합니다.
      이유: SEO 와 페이지의 정보(제목, 설명 등)를 설정하기 위해 필요합니다.*/}
      <Head>
        {/*왜?: 페이지의 제목을 동적으로 설정합니다.
      이유: 검색어에 따라 제목을 변경하여 사용자와 검색 엔진에 유용한 정보를 제공*/}
        <title>비타민 검색: "{query}"</title>
        <meta name="description" content={`Search results for "${query}"`} />
      </Head>
      <h1>"{query}" 검색 결과</h1>
      {/*왜?: 비타민 목록을 표시하는 컴포넌트를 렌더링합니다.
      이유: 검색 결과를 사용자에게 시각적으로 표시하기 위해 vitamins 배열을 props 로 전달*/}
      <VitaminList vitamins={vitamins} />
    </>
  );
};
/*getServerSideProps
* 왜?: Next.js의 서버 측 렌더링 기능을 사용하여 페이지가 요청될 때 데이터를 미리 가져옵니다.
이유: 페이지가 렌더링되기 전에 필요한 데이터를 서버에서 가져와 사용자에게 빠른 응답을 제공하기 위해 필요*/
export const getServerSideProps = async (context) => {
  /*왜?: URL 의 쿼리 파라미터에서 query 값을 추출합니다.
이유: 이 값은 사용자가 검색한 키워드를 나타내며, 데이터베이스 쿼리에 사용*/
  const { query } = context.query;

  const client = await MongoClient.connect(getMongoUrl());

  const db = client.db();
  const vitaminsCollection = db.collection('vitamins');

  const vitamins = await vitaminsCollection
    .find({
      /*왜?: title 또는 description 필드에서 정규 표현식을 사용하여 검색어와 일치하는 문서를 찾습니다.
      이유: 사용자가 입력한 검색어가 제목이나 설명에 포함된 비타민 데이터를 반환하기 위해 OR 조건을 사용하여
      더욱 유연한 검색 기능을 제공합니다.*/
      $or: [
        {
          title: { $regex: query, $options: 'i' },
        },
        { description: { $regex: query, $options: 'i' } },
      ],
    })
    .toArray();

  await client.close();

  /*왜?: 서버 측에서 가져온 데이터를 클라이언트에 전달하기 위해 객체를 반환합니다.
    이유: getServerSideProps는 반드시 props를 반환해야 하므로, 이 객체를 통해 클라이언트에 데이터를 전달*/
  return {
    /*왜?: 비타민 데이터와 검색어를 props로 설정합니다.
      이유: 클라이언트에서 이 데이터를 사용하여 검색 결과를 렌더링하기 위해 필요합니다. vitamins.map을 사용하여 필요한 필드만 추출하고,
      _id를 문자열로 변환하여 React에서 사용할 수 있도록 합니다.*/
    props: {
      vitamins: vitamins.map((vitamin) => ({
        title: vitamin.title,
        description: vitamin.description,
        image: vitamin.image,
        id: vitamin._id.toString(),
      })),
      query: query,
    },
  };
};

export default SearchPage;
