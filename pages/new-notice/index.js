import React from 'react';
import VitaminNoticeForm from '../../components/vitamins/VitaminNoticeForm';
import {useRouter} from 'next/router';
import Head from 'next/head';

function VitaminNewNoticePage() {
  const router = useRouter();

  async function addNoticeHandler(enteredNoticeData) {
    const response = await fetch('/api/new-notice', {
      method: 'POST',
      body: JSON.stringify(enteredNoticeData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const noticeData = await response.json();
    console.log(noticeData);
    await router.replace('/notice');
  }

  return (
    <>
      <Head>
        <title>Vitamin Notice Page</title>
        <meta name="description" content="비타민 공지사항 페이지" />
      </Head>
        <VitaminNoticeForm onAddNotice={addNoticeHandler} />
    </>
  );
}
export default VitaminNewNoticePage;
