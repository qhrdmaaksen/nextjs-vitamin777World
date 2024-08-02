import { MongoClient } from 'mongodb';
// config/db 에서 mongodb url 를 가져옴
import { getMongoUrl } from '../../config/db';

// api POST 요청 일 경우에 mongodb 에 데이터를 추가하는 코드
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    //getMongoUrl() 함수로 가져온 URL 를 사용하여 MongoDB에 연결
    const client = await MongoClient.connect(getMongoUrl());

    const db = client.db();
    // db 에서 vitamins 컬렉션을 가져옴
    const vitaminsCollection = db.collection('vitamins');
    // insertOne 메서드 사용하여 데이터를 컬렉션에 추가
    const result = await vitaminsCollection.insertOne(data);
    console.log(result);

    await client.close();

    res.status(201).json({ message: '비타민 제품 데이터베이스 등록 완료' });
  }
}

export default handler;
