import CreateEditPost from "../../../components/Post/CreateEditPost";

export default function UserPostEdit({ editPost }) {
  return <CreateEditPost {...editPost} />;
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context;
  const { postId } = { ...query };
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });
  return {
    props: {
      editPost: {
        ...post,
        createdAt: post.createdAt.toLocaleString(),
      },
    },
  };
}
