import CartItem from "./CartItem";
import { Fragment } from "react";
import { useAppContext } from "../../../public/src/shared/context/state";

const CartItems = (props) => {
  const { posts } = props;

  // App Context
  // remove post in the cart
  const { deletePostInCart } = useAppContext();
  const removePostHandler = (e, post) => {
    e.preventDefault();
    deletePostInCart(post);
  };

  const renderCartItem = (post) => {
    return (
      <CartItem
        key={post.id}
        {...post}
        onRemove={(e) => removePostHandler(e, post)}
      />
    );
  };

  const renderCartItems = () => {
    return (
      <ul className="py-6 border-b space-y-6 px-8">
        {posts.map((post) => renderCartItem(post))}
      </ul>
    );
  };

  return <Fragment>{renderCartItems()}</Fragment>;
};

export default CartItems;
