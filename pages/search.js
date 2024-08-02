import {useRouter} from "next/router";
import Head from "next/head";
import VitaminList from "../components/vitamins/VitaminList";
import {getMongoUrl} from "../config/db";
import {MongoClient} from "mongodb";

const SearchPage = ({ vitamins, query }) => {
    const router = useRouter();
    const { query } = router.query;

    return (
        <>
            <Head>
                <title>비타민 검색: "{query}"</title>
                <meta name="description" content={`Search results for "${query}"`}/>
            </Head>
            <h1>"{query}" 검색 결과</h1>
            <VitaminList vitamins={vitamins} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { query } = context.query;

    const client = await MongoClient.connect(getMongoUrl(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    const vitamins = await vitaminsCollection.find({
        $text: {
            $search: query,
        }
    }).toArray();
    await client.close();

    return {
        props: {
            vitamins: vitamins.map((vitamin) => ({
                title: vitamin.title,
                description: vitamin.description,
                image: vitamin.image,
                id: vitamin._id.toString(),
            })),
            query: query,
        }
    }
}

export default SearchPage;