import useInput from "../../../public/src/hooks/useInput";
import {
  validateEmail,
  validatePassword,
} from "../../../public/src/shared/helper";
import Link from "next/link";
import Input from "../Common/Input";
import { inputTypes } from "../../../public/src/shared/constant";

const Login = ({ onSubmit }) => {
  const {
    value: email,
    error: emailError,
    inputChangeHandler: emailChangeHandler,
    blurEventHandler: emailBlur,
    reset: resetEmail,
    isTouched: isEmailTouched,
  } = useInput((email) => validateEmail(email));

  const {
    value: password,
    error: passwordError,
    inputChangeHandler: passwordChangeHandler,
    blurEventHandler: passwordBlur,
    reset: resetPassword,
    isTouched: isPasswordTouched,
  } = useInput((password) => validatePassword(password));

  const submitLoginForm = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) return;

    const form = {
      email,
      password,
    };
    console.log("LOGIN_FORM", form);

    await onSubmit(form);

    reset();
  };

  const reset = () => {
    resetEmail();
    resetPassword();
  };

  return (
    <section className="h-fit mt-8">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="md:w-8/12 lg:w-6/12 mb-12">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>
          <div className="mb-44 md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={submitLoginForm}>
              <div className="mb-6">
                <Input
                  error={emailError && isEmailTouched}
                  type={inputTypes.EMAIL}
                  id={inputTypes.EMAIL}
                  name={inputTypes.EMAIL}
                  placeholder="Email"
                  value={email}
                  inputChangeHandler={emailChangeHandler}
                  blurHandler={emailBlur}
                  isRequired
                />
              </div>
              <div className="mb-6">
                <Input
                  error={passwordError && isPasswordTouched}
                  type={inputTypes.PASSWORD}
                  id={inputTypes.PASSWORD}
                  name={inputTypes.PASSWORD}
                  placeholder="Password"
                  value={password}
                  inputChangeHandler={passwordChangeHandler}
                  blurHandler={passwordBlur}
                  isRequired
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type={inputTypes.CHECK_BOX}
                    id={inputTypes.CHECK_BOX}
                    name={inputTypes.CHECK_BOX}
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-blue-600 focus:outline-none transition duration-200 mt-1 mr-2 cursor-pointer"
                  />
                  <label
                    className="form-check-label inline-block text-white"
                    htmlFor="checkbox"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="components/Component/Auth/Login#!"
                  className="text-white"
                >
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  name="login-button"
                  id="login-button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
                <p className="text-white text-sm font-semibold mt-2 pt-1 mb-0">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account?
                  <Link href="/auth/signup">
                    <a className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                      Register
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
