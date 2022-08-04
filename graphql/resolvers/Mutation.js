import {
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/userController";
import {
  createPost,
  deletePost,
  updatePost,
} from "../../controllers/postController";

const Mutation = {
  createUser,
  deleteUser,
  updateUser,
  createPost,
  deletePost,
  updatePost,
};

export default Mutation;
