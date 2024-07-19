import NewVitaminForm from '../../components/vitamins/NewVitaminForm';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';

function NewVitaminPage() {
  // nextjs 의 라우팅 기능 사용하기 위한 훅
  // nextjs 의 라우터 객체를 가져와 페이지 이동 처리
  const router = useRouter();

  /* 비동기 함수로, 뉴비타민 정보를 서버 전송
   * 파라미터 enteredVitaminData(사용자가 입력한 비타민 정보)
   * fetch 를 사용해 /api/new-vitamin 엔드포인트로 post 요청 보냄
   * 요청 바디에 json 형식의 비타민 데이터 포함되있음
   * */
  async function addVitaminHandler(enteredVitaminData) {
    const response = await fetch('/api/new-vitamin', {
      method: 'POST',
      body: JSON.stringify(enteredVitaminData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    console.log(data);
    // 뒤로가기 없이 홈페이지로 이동
    await router.replace('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Admin Page</title>
        <meta name="description" content="vitamins info add page" />
      </Head>
      <NewVitaminForm onAddVitamin={addVitaminHandler} />
    </Fragment>
  );
}

export default NewVitaminPage;
