import VitaminList from '../components/vitamins/VitaminList';
import {Fragment, useEffect, useState} from "react";
import {MongoClient} from "mongodb";
import Head from "next/head";
import RightSideBanner from "../components/banner/RightSideBanner";
import LeftSideBanner from "../components/banner/LeftSideBanner";
import AdminInputForm from "../components/vitamins/AdminInputForm";

function HomePage(props) {
    /*
    * nextJS 에서 getStaticProps 를 사용하면 서버에서 미리 데이터를 가져와서 사전 렌더링을 할 수있기에
    * 클라이언트에서 데이터를 가져오는 것보다 빠르게 데이터를 가져올 수 있다.
    * 그러므로 컴포넌트에서 따로 useEffect 로 데이터를 가져오면 두 번 데이터를 가져오게 되므로 비효율적이다.
    const [loadedVitamins, setLoadedVitamins] = useState([]);
    useEffect(() => {
        setLoadedVitamins(DUMMY_VITAMINS)
    }, [])
    return <VitaminList vitamins={loadedVitamins}/>
    */
    const RightBannerImages = [
        '/util/3d-delicious-seasonal-fruits_23-2151046863.jpg',
        '/util/close-up-citrus-sesonal-fruits-winter_23-2151035447.jpg',
        '/util/close-up-futuristic-soft-drink_23-2151281958.jpg',
    ]
    const LeftBannerImages = [
        '/util/raw-foodstuff-with-water-drops-studio_23-2151364890.jpg',
        '/util/view-abstract-fluid-monochrome-palette_23-2150635178.jpg',
        '/util/bottle-lemons-lemons-grapefruit-are-displayed-white-background_772785-16214.jpg',
    ]
    return (
        <Fragment>
            <Head>
                <title>vitamin777world Home</title>
                <meta name="description" content="vitamin, vitamins, health, multi vitamin, vitamins platform"/>
            </Head>
            <RightSideBanner RightBannerImages={RightBannerImages} interval={4000} />
            <LeftSideBanner LeftBannerImages={LeftBannerImages} interval={4000} />
            <AdminInputForm />
            <VitaminList vitamins={props.vitamins}/>
        </Fragment>
    )
}

/*export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            vitamins: DUMMY_VITAMINS
        }
    }
}*/

export async function getStaticProps() {
    // nextJS 에서 서버 측 코드에서 fetch 를 사용할 수 있도록 기능 추가
    const client = await MongoClient.connect(
        'mongodb+srv://vitamin7777777:lORyN6Qiye7191vZ@cluster0.4ocsomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    const vitamins = await vitaminsCollection.find().toArray();

    await client.close();

    return {
        props: {
            vitamins: vitamins.map((vitamin) => ({
                title: vitamin.title,
                address: vitamin.address,
                image: vitamin.image,
                id: vitamin._id.toString()
            })),
        },
        revalidate: 1 // 1초마다 렌더링을 다시한다.
    }
}

export default HomePage;
