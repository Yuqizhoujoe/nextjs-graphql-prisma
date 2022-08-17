import {
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/userController";
import {
  checkoutPosts,
  createPost,
  deletePost,
  purchasePost,
  sellPost,
  updatePost,
} from "../../controllers/postController";

const Mutation = {
  createUser,
  deleteUser,
  updateUser,
  createPost,
  deletePost,
  updatePost,
  purchasePost,
  sellPost,
  checkoutPosts,
};

export default Mutation;
