import PropTypes from "prop-types";
import { post } from "../../shared/propTypes";
import Post from "./Post";

const Posts = ({ posts, isPurchase }) => {
  const renderPost = (post) => (
    <Post key={post.id} {...post} isPurchase={isPurchase} />
  );

  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 p-8">
      {posts.map((post) => renderPost(post))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(post)),
};

export default Posts;
