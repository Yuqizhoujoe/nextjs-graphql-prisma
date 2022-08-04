/*
query GET_POST($id: ID!) {
  getPost(id: $id) {
    id
    title
    createdAt
    user {
      name
    }
  }
}

{
  "id": "620146c3-98ab-485b-8729-2a99a1d11017"
}
*/
export const getPost = async (parent, arg, { db, pubsub }, info) => {
  let { id } = { ...arg };
  const post = db.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      user: true,
    },
  });
  if (!post) throw new Error("Post not found");
  return post;
};
export const getPosts = async (parent, arg, { db, pubsub }, info) => {
  let query = arg.query ? arg.query : "";

  const posts = await db.post.findMany({
    where: {
      OR: [{ title: { contains: query } }, { content: { contains: query } }],
    },

    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      user: true,
    },
  });

  console.log(posts);
  return posts;
};
export const createPost = async (parent, arg, { db, pubsub }, info) => {
  const {
    post: { title, content, published, userId, image },
  } = { ...arg };

  const userExisted = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExisted) {
    throw new Error("User not existed!");
  }

  const newPost = {
    title,
    content,
    published,
    image,
  };

  const createPost = await db.post.create({
    data: {
      ...newPost,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      user: true,
      createdAt: true,
      image: true,
    },
  });
  console.log("createPost: ", createPost);

  return createPost;
};
export const deletePost = async (parent, arg, { db, pubsub }, info) => {
  const { id } = { ...arg };

  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found!");

  const deletePost = await db.post.delete({
    where: { id },
  });

  return deletePost;
};
export const updatePost = async (parent, arg, { db, pubsub }, info) => {
  const { id, data } = { ...arg };

  const post = await db.post.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Post not found!");

  const updatedPost = await db.post.update({
    where: { id },
    data: { ...data },
  });

  return updatedPost;
};
