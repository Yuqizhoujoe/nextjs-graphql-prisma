import { Fragment, useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { formatCurrency } from "../../shared/helper";
import { useSession } from "next-auth/react";
import _ from "lodash";
import useTransaction from "../../hooks/useTransaction";
import ButtonComponent from "../common/ButtonComponent";
import { useRouter } from "next/router";

const PostView = ({
  id: postId,
  title,
  content,
  image,
  price,
  userId: postUserId,
  published,
}) => {
  const { height } = useWindowSize();
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
      console.log("POST_VIEW", data);
      router.prefetch(`/user/${userId}/posts`).then(() => {
        router.push(`/user/${userId}/posts`);
      });
    }
  }, [data]);

  const renderPostView = () => {
    return (
      <div
        id={postId}
        style={{
          height: height,
        }}
        className={`jojo_post_view mx-auto w-3/4 shadow p-8 grid grid-rows-2 grid-flow-row gap-2`}
      >
        <div className={`w-full h-full flex justify-center`}>
          <img className={`rounded-xl object-cover`} src={image} alt={title} />
        </div>
        <div className="w-full p-8 rounded-lg self-start grid grid-flow-row gap-2">
          <div className="flex flex-col items-end">
            <span className="text-xl font-bold ">{formatCurrency(price)}</span>
            <ButtonComponent
              postUserId={postUserId}
              published={published}
              onClick={doTransactionHandler}
            />
          </div>
          <div>
            <h3 className="font-bold text-2xl">{title} 🤣</h3>
            <p className="">{content}</p>
          </div>
        </div>
      </div>
    );
  };
  const handlePurchase = (e) => {
    e.preventDefault();
  };

  return <Fragment>{renderPostView()}</Fragment>;
};

export default PostView;
