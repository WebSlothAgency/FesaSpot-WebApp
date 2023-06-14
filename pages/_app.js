import '../styles/globals.css'
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GoogleAnalytics } from "nextjs-google-analytics";

const client = new ApolloClient({
  uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clhvznxbz10sb01tbempl16ux/master',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaMeasurementId='G-G774GS5VKK' trackPageViews />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
