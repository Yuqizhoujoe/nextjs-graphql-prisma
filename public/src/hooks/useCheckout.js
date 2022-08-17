import { gql, useMutation } from "@apollo/client";
import _ from "lodash";

const CHECKOUT_MUTATION = gql`
  mutation CheckoutPosts($userId: Int!, $postIds: [Int!]!) {
    checkoutPosts(userId: $userId, postIds: $postIds) {
      name
      balance
      posts {
        title
        published
        price
      }
    }
  }
`;

const useCheckout = () => {
  const [doCheckout, { data, loading, error }] = useMutation(CHECKOUT_MUTATION);

  const checkout = (userId, postIds) => {
    if (!userId || _.isEmpty(postIds)) return;
    doCheckout({
      variables: {
        userId: userId,
        postIds: postIds,
      },
    });
  };

  return {
    checkout,
    data,
    loading,
    error,
  };
};

export default useCheckout;
