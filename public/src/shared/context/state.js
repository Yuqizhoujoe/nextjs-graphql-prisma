import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [post, setPost] = useState();
  const [postsInCart, setPostsInCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  const cachePost = (newPost) => {
    console.log("newPost", newPost);
    setPost(newPost);
  };

  const addPostToCart = (post) => {
    if (postsInCart.find((p) => p.id === post.id)) return;
    const newPostsInCart = [...postsInCart, post];
    setPostsInCart(newPostsInCart);
  };

  const deletePostInCart = (post) => {
    const { id: postId } = post;
    const newPostsInCart = [...postsInCart].filter(
      (post) => post.id !== postId
    );
    setPostsInCart(newPostsInCart);
  };

  const clearCart = () => {
    setPostsInCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        post,
        cachePost,
        addPostToCart,
        deletePostInCart,
        postsInCart,
        openCart,
        setOpenCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
