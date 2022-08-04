import Login from "../../components/Auth/Login";
import { signIn } from "next-auth/react";

const login = () => {
  const loginHandler = async (loginForm) => {
    const { email, password } = loginForm;
    const loginResult = await signIn("jojo", {
      redirect: true,
      email,
      password,
    });
    console.log(loginResult);
  };

  return <Login onSubmit={loginHandler} />;
};

export default login;
