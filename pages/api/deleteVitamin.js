import { getMongoUrl } from '../../config/db';
import { MongoClient, ObjectId } from 'mongodb';

const deleteVitamin = async (req, res) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || !ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: '유효하지 않은 비타민 id 입니다' });
    }
    const client = await MongoClient.connect(getMongoUrl());
    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    try {
      const result = await vitaminsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 1) {
        return res.status(200).json({ message: '비타민 제품 삭제 완료' });
      } else {
        return res
          .status(404)
          .json({ message: '비타민 제품을 찾을 수 없습니다' });
      }
    } catch (error) {
      console.error('삭제중 오류 발생: ', error);
      return res
        .status(500)
        .json({ message: '비타민 제품 삭제 중 서버 오류가 발생했습니다.' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} 허용되지않음`);
  }
};

export default deleteVitamin;
