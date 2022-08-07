import {
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/userController";
import {
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
};

export default Mutation;
