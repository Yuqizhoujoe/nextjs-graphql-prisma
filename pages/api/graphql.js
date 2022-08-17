import { ApolloServer, gql } from "apollo-server-micro";
import * as fs from "fs";
import Mutation from "../../server/graphql/resolvers/Mutation";
import Query from "../../server/graphql/resolvers/Query";
import prisma from "../../prisma/prisma";
import * as path from "path";

const graphqlDir = path.join(process.cwd(), "/server/graphql");
const defs = fs.readFileSync(graphqlDir + "/schema.graphql").toString();
const typeDefs = gql`
  ${defs}
`;

const resolvers = {
  Mutation,
  Query,
};

const context = {
  db: prisma,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  csrfPrevention: true,
  cache: "bounded",
});

const startServer = server.start();

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
};

// // Apollo Server Micro takes care of body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
