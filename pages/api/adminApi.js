import { MongoClient } from 'mongodb';
import { getMongoUrl } from '../../config/db';

const adminApi = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { adminId, adminPassword } = req.body;

  if (!adminId || !adminPassword) {
    res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요' });
    return;
  }

  try {
    const client = await MongoClient.connect(getMongoUrl());

    const db = client.db();

    const adminCollection = db.collection('admin');

    const adminInfo = await adminCollection.findOne({
      adminId: adminId,
      adminPassword: adminPassword,
    });

    if (!adminInfo) {
      res
        .status(401)
        .json({ message: '아이디 또는 비밀번호가 일치하지 않습니다' });
      return;
    }

    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '로그인 중 서버 오류 발생' });
  } finally {
    client.close();
  }
};

export default adminApi;