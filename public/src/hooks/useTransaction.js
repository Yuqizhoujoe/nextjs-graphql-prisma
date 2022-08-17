import { gql, useMutation } from "@apollo/client";
import { useAppContext } from "../shared/context/state";

const PURCHASE_MUTATION = gql`
  mutation PurchasePost($postId: Int!, $userId: Int!, $price: Int!) {
    purchasePost(postId: $postId, userId: $userId, price: $price) {
      id
      title
      content
      published
      image
      price
      user {
        id
        balance
      }
      createdAt
    }
  }
`;

const SELL_MUTATION = gql`
  mutation SellPost($postId: Int!, $userId: Int!) {
    sellPost(postId: $postId, userId: $userId) {
      id
      title
      content
      published
      image
      price
      createdAt
      user {
        id
        name
      }
    }
  }
`;

export default function useTransaction({ userId, price, postId }) {
  const [
    doPurchase,
    { data: purchaseData, loading: purchaseLoading, error: purchaseError },
  ] = useMutation(PURCHASE_MUTATION);
  const [doSell, { data: sellData, loading: sellLoading, error: sellError }] =
    useMutation(SELL_MUTATION);

  const { postsInCart, setOpenCart } = useAppContext();

  const doTransactionHandler = (e, isPurchase) => {
    e.preventDefault();

    if (postsInCart.find((post) => post.id === postId)) {
      setOpenCart(true);
      return;
    }

    if (isPurchase) {
      return doPurchase({
        variables: {
          postId,
          userId,
          price,
        },
      });
    }

    return doSell({
      variables: {
        postId,
        userId,
      },
    });
  };

  return {
    doTransactionHandler,
    data: purchaseData || sellData,
    loading: purchaseLoading || sellLoading,
    error: purchaseError || sellError,
  };
}
