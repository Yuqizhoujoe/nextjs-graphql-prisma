import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../prisma/prisma";
import { verifyPassword } from "../../../shared/auth";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "jojo",
      name: "jojo",
      /**
       * 1. reach out Provider authorize fn to authenticate user email and password
       * @param credentials
       * @returns {Promise<User>}
       */
      async authorize(credentials) {
        // console.group("CREDENTIAL_PROVIDER_JOJO");
        // console.log("CREDENTIALS", credentials);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) throw new Error("no user found!");

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("password is incorrect");

        // console.log("USER", user);
        // console.groupEnd();
        return user;
      },
    }),
  ],
  callbacks: {
    /**
     * 5. when client side call useSession() or getSession()
     * @param session
     * @param token
     * @param user
     * @returns {Promise<Session>}
     */
    async session({ session, token }) {
      const encodedToken = jwt.sign(token, process.env.SECRET, {
        algorithm: "HS256",
      });
      const { id, user } = { ...token };
      session.id = id;
      session.token = encodedToken;
      session.user = user;
      // console.group("SESSION CALLBACK_FN");
      // console.log("SESSION", session);
      // console.log("TOKEN", token);
      // console.log("USER", token.user, user);
      // console.groupEnd();
      return Promise.resolve(session);
    },
    /**
     * 2. reach out jwt callback fn - jwt to define and construct the token
     * @param token
     * @param user
     * @param account
     * @param profile
     * @param isNewUser
     * @returns {Promise<JWT>}
     */
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.group("JWT CALLBACK_FN");
      if (user) token.user = user;
      // console.log("USER", user);
      // console.log("TOKEN", token);
      // console.log("IS_NEW_USER", isNewUser);
      // console.log("PROFILE", profile);
      // console.groupEnd();
      return Promise.resolve(token);
    },
    async redirect({ url, baseUrl }) {
      console.group("REDIRECT CALLBACK_FN");
      console.log("URL", url);
      console.log("BASE_URL", baseUrl);
      console.groupEnd();
      return baseUrl;
    },
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
    /**
     * 3. after constructing the token, reach out jwt encode fn to encode jwt token
     * TODO: put the useful info into token and encode the token
     * @param secret
     * @param token
     * @param maxAge
     * @returns {Promise<*>}
     */
    encode: async ({ secret, token, maxAge }) => {
      // console.group("JWT_ENCODE");
      const { user } = { ...token };
      const jwtCliams = {
        sub: token.sub.toString(),
        name: token.name,
        email: token.email,
        user: user,
        iat: Date.now() / 1000,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      };
      const encodedToken = jwt.sign(jwtCliams, secret, { algorithm: "HS256" });
      // console.log("JWT_CLAIMS", jwtCliams);
      // console.log("TOKEN", token);
      // console.log("ENCODED_TOKEN", encodedToken);
      // console.groupEnd();
      return encodedToken;
    },
    /**
     * 4. decode the encode token when consuming the token from client
     * @param secret
     * @param token
     * @param maxAge
     * @returns {Promise<*>}
     */
    decode: async ({ secret, token, maxAge }) => {
      // // console.group('JWT_DECODE');
      const decodedToken = jwt.verify(token, secret, { algorithm: "HS256" });
      // // console.log("TOKEN", token);
      // // console.log("DECODED_TOKEN", decodedToken);
      // // console.groupEnd();
      return decodedToken;
    },
  },
});
