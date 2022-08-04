import "../styles/globals.css";
import Layout from "../components/Container/Layout";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/graphql-client";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp
