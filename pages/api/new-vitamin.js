import { MongoClient } from 'mongodb';
import { getMongoUri } from '../../config/db';

// api POST 요청 일 경우에 mongodb 에 데이터를 추가하는 코드
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(getMongoUri());

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    const result = await vitaminsCollection.insertOne(data);
    console.log(result);

    await client.close();

    res.status(201).json({ message: 'vitamin inserted' });
  }
}

export default handler;
