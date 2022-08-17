import Link from "next/link";
import Image from "next/image";
import jojoLogo from "../../../public/jojo.png";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { routes } from "../../../public/src/shared/constant";
import { useAppContext } from "../../../public/src/shared/context/state";
import _ from "lodash";
import { AddShoppingCart } from "@mui/icons-material";
import { Badge } from "@mui/material";

const Header = () => {
  const { data: session } = useSession();
  const { user } = { ...session };
  const { id: userId } = { ...user };

  const router = useRouter();
  const { query, route } = router;

  const [postId, setPostId] = useState("");
  const [createPostBtnEnable, setCreatePostBtn] = useState(false);
  const [backToHome, setBackToHome] = useState(false);
  const [editEnable, enableEdit] = useState(false);

  // context
  const { post, postsInCart, setOpenCart } = useAppContext();
  useEffect(() => {
    if (post && post.id && userId) {
      enableEdit(post.userId === userId);
    }
  }, [post, userId]);

  useEffect(() => {
    setBackToHome(route !== routes.HOME_PAGE);
    setCreatePostBtn(route === routes.USER_POSTS);

    const postIdQueryParam = _.get(query, "postId", null);
    setPostId(postIdQueryParam);
    enableEdit(route !== routes.USER_POST_EDIT);
  }, [query, route]);

  const renderCartIcon = () => {
    return (
      <a
        className="mr-9 hover:scale-90 focus:ring-blue-300"
        onClick={() => setOpenCart(true)}
      >
        <Badge badgeContent={postsInCart.length} color="error">
          <AddShoppingCart color="success" />
        </Badge>
      </a>
    );
  };

  const renderHeaderButton = () => {
    return (
      <div className="flex items-center">
        {renderCartIcon()}
        {backToHome && (
          <Link href="/">
            <a className="text-gray-500 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Home
            </a>
          </Link>
        )}
        {!session && (
          <Link href="/auth/signup">
            <a className="text-black bg-fuchsia-300 hover:bg-fuchsia-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Sign Up
            </a>
          </Link>
        )}
        {!session && (
          <Link href="/auth/login">
            <a className="text-gray-500 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Log in
            </a>
          </Link>
        )}
        {postId && editEnable && (
          <Link href={`/post/${postId}/edit`}>
            <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Edit Your Post
            </a>
          </Link>
        )}
        {createPostBtnEnable && (
          <Link href={`/post/create`}>
            <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Create Your Post
            </a>
          </Link>
        )}
        {session && !createPostBtnEnable && (
          <Link href={`/user/${userId}/posts`}>
            <a className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              Your Posts
            </a>
          </Link>
        )}
        {session && (
          <button
            onClick={() =>
              signOut({
                redirect: true,
              })
            }
            className="text-black bg-yellow-200 hover:bg-yellow-800 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
          >
            Sign Out
          </button>
        )}
      </div>
    );
  };

  return (
    <header>
      <nav className="bg-black border-gray-200 px-4 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <Link href="/">
            <a className="flex items-center justify-self-start hover:cursor-alias">
              <Image
                src={jojoLogo}
                width="50px"
                height="50px"
                alt="JOJO Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                JOJO
              </span>
            </a>
          </Link>
          {renderHeaderButton()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
