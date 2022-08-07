import Link from "next/link";
import { formatCurrency } from "../../shared/helper";
import Button from "../common/ButtonComponent";
import useTransaction from "../../hooks/useTransaction";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Post = ({
  id: postId,
  title,
  image,
  price,
  userId: postUserId,
  published,
}) => {
  const { data: session } = useSession();
  const { user } = { ...session };
  const router = useRouter();

  const [userId, setUserId] = useState();

  useEffect(() => {
    if (user && !_.isEmpty(user) && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  // GraphQL
  const { doTransactionHandler, data, loading, error } = useTransaction({
    postId,
    userId,
    price,
  });

  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      console.log("POST", data);
      router.prefetch(`/user/${userId}/posts`).then(() => {
        router.reload(`/user/${userId}/posts`);
      });
    }
  }, [data]);

  return (
    <div key={postId} className="max-w-sm bg-slate-900 rounded-lg shadow">
      <Link href={`/post/${postId}`}>
        <a className="w-full h-full overflow-hidden">
          <img
            className="w-full h-60 rounded-lg hover:cursor-pointer hover:opacity-75 hover:scale-90"
            src={image}
            alt={title}
          />
        </a>
      </Link>
      <div className="mt-3 px-5 pb-5">
        <a>
          <h5 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h5>
        </a>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold ">{formatCurrency(price)}</span>
          <Button
            published={published}
            postUserId={postUserId}
            onClick={doTransactionHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

// <a key={id} className="group ">
//     <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
//         <img
//             src={image}
//             alt={title}
//             className="w-full h-80 object-center object-cover group-hover:opacity-75 group-hover:scale-90"
//         />
//     </div>
//     <h3 className="mt-4 text-2xl text-gray-500"> {title} 🥰 </h3>
// </a>
