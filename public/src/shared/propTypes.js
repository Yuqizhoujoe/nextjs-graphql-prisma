import PropTypes from "prop-types";

export const post = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  published: PropTypes.bool,
};

export const user = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  age: PropTypes.number,
  posts: PropTypes.arrayOf(PropTypes.shape(post)),
};
