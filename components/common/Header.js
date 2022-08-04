import Link from "next/link";
import Image from "next/image";
import jojoLogo from "../../public/jojo.png";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { routes } from "../../shared/constant";

const Header = () => {
  const { data: session } = useSession();
  const { user } = { ...session };
  const { id: userId } = { ...user };

  const router = useRouter();
  const { query, route } = router;

  const [postId, setPostId] = useState("");
  const [createPostBtnEnable, setCreatePostBtn] = useState(false);

  useEffect(() => {
    if (query && query.postId) {
      setPostId(query.postId);
      setCreatePostBtn(false);
    } else if (route && route === routes.USER_POSTS) {
      setCreatePostBtn(true);
      setPostId(null);
    } else {
      setPostId(null);
      setCreatePostBtn(false);
    }
  }, [query, route]);

  return (
    <header>
      <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <a className="flex items-center hover:cursor-alias">
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
          <div className="flex items-center">
            {!session && (
              <Link href="/auth/login">
                <a className="text-gray-500 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Log in
                </a>
              </Link>
            )}
            {postId && (
              <Link href={`/post/${postId}/edit`}>
                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  Edit Your Post
                </a>
              </Link>
            )}
            {createPostBtnEnable && (
              <Link href={`/post/create`}>
                <a className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  Create Your Post
                </a>
              </Link>
            )}
            {session && (
              <Link href={`/user/${userId}/posts`}>
                <a className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  Your Posts
                </a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
