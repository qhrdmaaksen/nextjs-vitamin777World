import { MongoClient } from "mongodb";
import { getMongoUri } from "../../config/db";

async function noticeApiHandler(req, res) {
    if( req.method === "POST") {
        const reqNoticeData = req.body;
        const client = await MongoClient.connect(getMongoUri());
        const db = client.db();
        const noticeCollection = db.collection("notices")
        const result = await noticeCollection.insertOne(reqNoticeData);
        console.log("등록되는 공지사항 데이터" + result)

        await client.close();

        res.status(201).json({message: "공지사항 데이터베이스 등록 완료"})
    }
}

export default noticeApiHandler;