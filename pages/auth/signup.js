import Signup from "../../components/Auth/Signup";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      id
      name
      email
      password
      age
    }
  }
`;

const SignupPage = () => {
  const [doSignUp, { data, loading, error }] = useMutation(CREATE_USER);
  const router = useRouter();

  useEffect(() => {
    if (data && !_.isEmpty(data)) {
      router.replace("/");
    }
  }, [data]);

  const submitSignUp = (form) => {
    doSignUp({
      variables: {
        user: {
          ...form,
          age: parseInt(form.age),
        },
      },
    });
  };

  return <Signup onSubmit={submitSignUp} />;
};

export default SignupPage;
