// eslint-disable react-hooks/rules-of-hooks
import PostView from "../../../components/Component/Post/PostView";
import { useAppContext } from "../../../public/src/shared/context/state";
import { useEffect } from "react";

export default function Post({ post }) {
  const { cachePost } = useAppContext();

  useEffect(() => {
    cachePost({ ...post });
  }, []);

  return <PostView {...post} />;
}

export async function getServerSideProps(context) {
  console.group("POST_PAGE");
  const { req, res, query, params } = context;
  const { postId } = { ...query };
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  console.log("POST", post);
  console.groupEnd();
  return {
    props: {
      post: {
        ...post,
        createdAt: post.createdAt?.toLocaleDateString(),
      },
    },
  };
}
