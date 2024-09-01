import React from 'react';
import VitaminNoticeForm from '../../components/vitamins/VitaminNoticeForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

const VitaminNewNoticePage = () => {
  const router = useRouter();

  const addNoticeHandler = async (enteredNoticeData) => {
    const response = await fetch('http://localhost:3000/api/new-notice', {
      method: 'POST',
      body: JSON.stringify(enteredNoticeData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const noticeData = await response.json();
    console.log(noticeData);
    await router.replace('/notice');
  };

  return (
    <>
      <Head>
        <title>Vitamin Notice Page</title>
        <meta name="description" content="비타민 공지사항 페이지" />
      </Head>
      <VitaminNoticeForm onAddNotice={addNoticeHandler} />
    </>
  );
};
export default VitaminNewNoticePage;
