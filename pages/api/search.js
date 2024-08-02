import {getMongoUrl} from "../../config/db";
import {MongoClient} from "mongodb";

export default async function searchHandler (req, res) {
    if(req.method !== 'GET') {
        res.status(405).end();
        return;
    }

    const { query } = req.query;

    const client = await MongoClient.connect(getMongoUrl(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    const searchResults = await vitaminsCollection.find({
        $text: {
            $search: query,
        }
    }).toArray();
    await client.close();

    res.status(200).json(searchResults);
}