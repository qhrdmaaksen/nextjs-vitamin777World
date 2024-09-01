import { MongoClient, ObjectId } from 'mongodb';
import { getMongoUrl } from '../../config/db';

export default async function updateVitamin(req, res) {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }

  const { id } = req.query;
  const updateData = req.body;
  console.log('수신한 업데이트 데이터: ', updateData);

  const client = await MongoClient.connect(getMongoUrl());
  const db = client.db();
  const vitaminsCollection = db.collection('vitamins');
  try {
    const updatedVitamin = await vitaminsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    if (updatedVitamin.matchedCount === 0) {
      return res.status(404).json({ message: '업데이트 비타민 정보 찾을수 없음01'});
    }

    if (updatedVitamin.modifiedCount === 0 ){
      return res.status(400).json({ message: '수정할 데이터가 없습니다.'})
    }

    if (!updatedVitamin) {
      return res
        .status(404)
        .json({ message: '업데이트 비타민 정보 찾을 수 없음02' });
    }
    res
      .status(200)
      .json({ message: '비타민 데이터 수정 성공', data: updatedVitamin });
  } catch (error) {
    console.error('데이터베이스 수정 오류: ', error);
    res.status(500).json({ message: '서버 오류' });
  } finally {
    await client.close();
  }
}
