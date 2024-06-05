import VitaminDetail from "../../components/vitamins/VitaminDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

function VitaminDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.vitaminData.title}</title>
                <meta name="description" content={props.vitaminData.description}/>
            </Head>
            <VitaminDetail
                image={props.vitaminData.image}
                title={props.vitaminData.title}
                address={props.vitaminData.address}
                description={props.vitaminData.description}
            />
        </Fragment>
    )
}

export async function getStaticPaths() {

    const client = await MongoClient.connect(
        'mongodb+srv://vitamin7777777:lORyN6Qiye7191vZ@cluster0.4ocsomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    // 객체중에 id 만 가져오기
    const vitamins = await vitaminsCollection.find({}, {_id: 1}).toArray();

    await client.close();

    return {
        fallback: false,
        paths: vitamins.map((vitamin) => ({params: {vitaminId: vitamin._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    const vitaminId = context.params.vitaminId;

    const client = await MongoClient.connect(
        'mongodb+srv://vitamin7777777:lORyN6Qiye7191vZ@cluster0.4ocsomh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    const db = client.db();
    const vitaminsCollection = db.collection('vitamins');

    const selectedVitamin = await vitaminsCollection.findOne({_id: new ObjectId(vitaminId)});

    await client.close();

    return {
        props: {
            vitaminData: {
                id: selectedVitamin._id.toString(),
                image: selectedVitamin.image,
                title: selectedVitamin.title,
                address: selectedVitamin.address,
                description: selectedVitamin.description,
            }
        }
    }
}

export default VitaminDetails;