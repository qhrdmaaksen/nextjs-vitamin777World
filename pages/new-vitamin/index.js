import NewVitaminForm from '../../components/vitamins/NewVitaminForm';
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";

function NewVitaminPage() {

    const router = useRouter();

    async function addVitaminHandler(enteredVitaminData) {
        const response = await fetch('/api/new-vitamin', {
            method: 'POST',
            body: JSON.stringify(enteredVitaminData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()

        console.log(data);
        // 뒤로가기 없이 홈페이지로 이동
        await router.replace('/');
    }

    return (
        <Fragment>
            <Head>
                <title>Admin Page</title>
                <meta name="description" content="vitamins info add page"/>
            </Head>
            <NewVitaminForm
                onAddVitamin={addVitaminHandler}
            />
        </Fragment>
    )
}

export default NewVitaminPage;