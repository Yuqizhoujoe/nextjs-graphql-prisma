import "../styles/globals.css";
import Layout from "../components/Container/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../server/graphql/graphql-client";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { AppWrapper } from "../public/src/shared/context/state";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <AppWrapper>
          <Head>
            <meta charSet="utf-8" />
            <title>JoJo NextJs Project</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
