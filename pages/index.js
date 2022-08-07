import Posts from "../components/Post/Posts";
import prisma from "../prisma/prisma";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home({ posts }) {
  const { data: session, status } = useSession();
  const { user } = { ...session };

  useEffect(() => {
    // console.log('session', session);
    // console.log('user', user);
    // console.log('status', status);
  }, [session]);

  return <Posts posts={posts} isPurchase />;
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
