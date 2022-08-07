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
import _ from "lodash";

export const getPost = async (parent, arg, { db, pubsub }, info) => {
  let { id } = { ...arg };
  const post = db.post.findUnique({
    where: { id },
    include: {
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

    include: {
      user: true,
    },
  });

  console.log(posts);
  return posts;
};
export const createPost = async (parent, arg, { db, pubsub }, info) => {
  const {
    post: { title, content, published, userId, image, price },
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
    price,
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
    include: {
      user: true,
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
    include: {
      user: true,
    },
  });

  return updatedPost;
};
export const purchasePost = async (parent, arg, { db, pubsub }, info) => {
  const { postId, userId, price } = { ...arg };

  // fetch user
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      posts: true,
    },
  });
  if (!user) throw new Error("User not found!");

  // fetch post
  const post = await db.post.findUnique({
    where: { id: postId },
    include: { user: true },
  });
  if (!post) throw new Error("Post not found!");
  // get seller
  const seller = post.user || {};
  if (_.isEmpty(seller)) throw new Error("Seller not found WTF");

  // avoid purchase again
  const userOwnedPosts = user.posts || [];
  if (userOwnedPosts.find((post) => post.id === postId))
    throw new Error("you already own this post");

  // deduct from user balance
  const { balance } = user;
  if (balance < price)
    throw new Error(
      `user don't have enough balance; user's balance: ${balance}; the post price: ${price}`
    );
  const newBalance = user.balance - price;
  // update user
  const updatedUserWithNewBalance = await db.user.update({
    where: { id: userId },
    data: {
      balance: newBalance,
    },
  });
  if (!updatedUserWithNewBalance) throw new Error("Transaction failed!");

  // change the post's holder
  const updatedPostWithNewUser = await db.post.update({
    where: { id: postId },
    data: {
      published: false,
      userId,
    },
    include: {
      user: true,
    },
  });
  if (!updatedPostWithNewUser) throw new Error("Transaction failed!");

  // after the post transaction successes, seller get the money so update seller balance
  const updatedSeller = await db.user.update({
    where: { id: seller.id },
    data: {
      balance: seller.balance + price,
    },
    include: {
      posts: true,
    },
  });

  console.log("updatedUserWithNewBalance", updatedUserWithNewBalance);
  console.log("updatedPostWithNewUser", updatedPostWithNewUser);
  console.log("updatedSeller", updatedSeller);
  return { ...updatedPostWithNewUser };
};
export const sellPost = async (parent, arg, { db, pubsub }, info) => {
  const { postId, userId } = { ...arg };

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { posts: true },
  });
  if (!user) throw new Error(`User ${userId} not found`);

  const userPosts = user.posts || [];
  if (_.isEmpty(userPosts)) throw new Errow(`user ${userId} has no posts```);

  const post = userPosts.find((post) => post.id === postId);
  if (!post) throw new Error(`User ${userId} doesn't own this post: ${postId}`);

  if (post.published) throw new Error(`this post ${postId} is already on sell`);

  // make the post published on the market
  const updatedPost = await db.post.update({
    where: { id: postId },
    data: { published: true },
    include: { user: true },
  });

  console.log(updatedPost);
  return { ...updatedPost };
};
