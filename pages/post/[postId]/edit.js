import CreateEditPost from "../../../components/Component/Post/CreateEditPost";
import { useSession } from "next-auth/react";
import _ from "lodash";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function UserPostEdit({ editPost }) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const userId = _.get(session, "user.id", null);
    const postUserId = _.get(editPost, "user.id", null);
    if (userId !== postUserId) router.prefetch(``);
  }, []);
  return <CreateEditPost {...editPost} />;
}

export async function getServerSideProps(context) {
  const { req, res, query, params } = context;
  const { postId } = { ...query };
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
    include: {
      user: true,
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
