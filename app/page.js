// pages/index.js

import Head from 'next/head';
import News from './components/News';

const Home = () => {
    return (
        <div>
            <Head>
                <title>RevoltronX News</title>
                <meta name="description" content="Latest news headlines" />
            </Head>
            <h1>RevoltronX News</h1>
            <News />
        </div>
    );
};

export default Home;
