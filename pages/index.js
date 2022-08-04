import Posts from "../components/Post/Posts";
import prisma from "../prisma/prisma";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home({ posts }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.group("HOME_PAGE");
    console.log("SESSION", session);
    console.log("STATUS", status);
    console.groupEnd();
  }, [session, status]);

  return <Posts posts={posts} />;
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


