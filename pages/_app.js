import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default MyApp;
