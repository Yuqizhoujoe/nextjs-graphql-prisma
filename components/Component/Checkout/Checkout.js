import CartItems from "./CartItems";
import { useAppContext } from "../../../public/src/shared/context/state";
import CheckoutSummary from "./CheckoutSummary";
import ButtonComponent from "../Common/ButtonComponent";
import { useSession } from "next-auth/react";
import _ from "lodash";
import useCheckout from "../../../public/src/hooks/useCheckout";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Checkout = () => {
  const { data: session } = useSession();
  const userId = _.get(session, "user.id", null);
  const { postsInCart, clearCart } = useAppContext();
  const router = useRouter();
  const { checkout, data: updatedBuyer } = useCheckout();

  const calculateTotalAmount = () => {
    return postsInCart.reduce((total, post) => total + post.price, 0);
  };

  const checkoutHandler = () => {
    const postIds = postsInCart.map((post) => post.id);
    checkout(userId, postIds);
  };

  useEffect(() => {
    if (updatedBuyer) {
      console.log("CHECKOUT_BUYER", updatedBuyer);
      clearCart();
      router.prefetch(`/user/${userId}/posts`).then(() => {
        router.replace(`/user/${userId}/posts`);
      });
    }
  }, [updatedBuyer]);

  return (
    <div className="lg:block hidden">
      <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
        Order Summary
      </h1>
      <CartItems posts={postsInCart} />
      <CheckoutSummary totalAmount={calculateTotalAmount()} />
      <div className="flex justify-end">
        <ButtonComponent
          isCheckout
          className="p-4 m-3"
          onClick={checkoutHandler}
        />
      </div>
    </div>
  );
};

export default Checkout;
