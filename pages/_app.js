import "../styles/app.css";
import { DefaultLayout } from '../components/context/contextLayout';

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || (
    page => (
      <DefaultLayout 
        pageProps={pageProps}
      >{page}</DefaultLayout>
    )
  )

  return (
    getLayout(
      <Component {...pageProps} />
    )
  );
}

export default MyApp;
