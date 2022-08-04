import Posts from "../../../components/Post/Posts";
import prisma from "../../../prisma/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function UserPosts({ userPosts }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //     console.log(status);
  //     console.log(session);
  //   if (status === authenticationStatus.UNAUTHENTICATED)
  //     router.push("/auth/login");
  // }, [status]);

  return <Posts posts={userPosts} />;
}

export async function getServerSideProps(context) {
  console.group("USER_POSTS");
  console.log("CONTEXT", context);
  const { req, res, query, params } = context;
  const { userId } = query;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: {
      posts: true,
    },
  });
  console.log("USER", user);

  const { posts } = { ...user };

  const transformedPosts = posts.map((post) => {
    return {
      ...post,
      createdAt: post.createdAt.toLocaleDateString(),
    };
  });

  console.groupEnd();
  return {
    props: {
      userPosts: transformedPosts,
    },
  };
}
