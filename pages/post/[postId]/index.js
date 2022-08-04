import PostView from "../../../components/Post/PostView";

export default function post({ post }) {
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
