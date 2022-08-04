import { hashPassword } from "../shared/auth";

export const getUser = async (parents, arg, { db }, info) => {
  const { id } = arg;
  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) throw new Error("User no found!");

  return user;
};
export const getUsers = async (parent, arg, { db }) => {
  let query = arg.query ? arg.query : "";
  const users = await db.user.findMany({
    where: {
      OR: [{ name: { contains: query } }, { email: { contains: query } }],
    },
    include: {
      posts: true,
    },
  });
  return users;
};
export const createUser = async (parent, arg, { db, pubsub }, info) => {
  const { user } = { ...arg };
  const { name, email, age, password } = { ...user };

  const emailExisted = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (emailExisted) throw new Error("Email already taken");

  const hashedPassword = await hashPassword(password);

  const newUser = {
    name,
    email,
    age,
    password: hashedPassword,
  };

  const createUser = await db.user.create({
    data: {
      ...newUser,
    },
  });

  return createUser;
};
export const deleteUser = async (parent, arg, { db, pubsub }, info) => {
  const { id } = { ...arg };

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new Error("User not found!!");

  const deleteUser = await db.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      posts: true,
    },
  });

  return deleteUser;
};
export const updateUser = async (parent, arg, { db, pubsub }, info) => {
  const { id, data } = { ...arg };
  const { email: updatedEmail } = data;

  const user = await db.user.findFirst({
    where: {
      id,
    },
  });
  if (!user) throw new Error("User not found!!");

  const emailTaken = await db.user.findFirst({
    where: {
      email: updatedEmail,
    },
  });
  if (emailTaken)
    throw new Error("Email has been taken, please try another email");

  const updateUser = await db.user.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      posts: true,
    },
  });
  return updateUser;
};
