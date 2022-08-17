import Login from "../../components/Component/Auth/Login";
import { signIn } from "next-auth/react";

const login = () => {
  const loginHandler = async (loginForm) => {
    const { email, password } = loginForm;
    const result = await signIn("jojo", {
      redirect: true,
      email,
      password,
    });
  };

  return <Login onSubmit={loginHandler} />;
};

export default login;
