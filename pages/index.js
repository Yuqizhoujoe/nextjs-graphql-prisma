import Posts from "../components/Component/Post/Posts";
import prisma from "../prisma/prisma";
import { Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import DrawerContainer from "../components/Container/DrawerContainer";

export default function Home({ posts }) {
  const { data: session, status } = useSession();
  const { user } = { ...session };

  useEffect(() => {
    // console.log('session', session);
    // console.log('user', user);
    // console.log('status', status);
  }, [session]);

  return (
    <Fragment>
      <DrawerContainer />
      <Posts posts={posts} isPurchase />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch posts data
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });
  const transformPosts = posts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toLocaleDateString(),
    };
  });

  return {
    props: {
      posts: transformPosts,
    },
  };
}
