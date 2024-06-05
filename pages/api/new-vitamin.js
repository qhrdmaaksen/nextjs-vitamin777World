import {MongoClient} from 'mongodb';

// api POST 요청 일 경우에 mongodb에 데이터를 추가하는 코드
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
            'mongodb+srv://vitamin7777777:lORyN6Qiye7191vZ@cluster0.4ocsomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
        );

        const db = client.db();
        const vitaminsCollection = db.collection('vitamins');

        const result = await vitaminsCollection.insertOne(data);
        console.log(result);

        await client.close();

        res.status(201).json({message: 'vitamin inserted'});
    }
}

export default handler;