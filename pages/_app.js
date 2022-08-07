import "../styles/globals.css";
import Layout from "../components/Container/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/graphql-client";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Head>
          <meta charSet="utf-8" />
          <title>JoJo NextJs Project</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
