import Link from "next/link";
import Input from "../common/Input";
import { inputConstant, inputTypes } from "../../shared/constant";
import useInput from "../../hooks/useInput";
import {
  validate,
  validateConfirmedPassword,
  validateEmail,
  validatePassword,
} from "../../shared/helper";

const Signup = ({ onSubmit }) => {
  const {
    value: name,
    error: nameError,
    inputChangeHandler: nameChangeHandler,
    blurEventHandler: nameBlur,
    reset: resetName,
    isTouched: isNameTouched,
  } = useInput((name) => validate(name));

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

  const {
    value: confirmedPassword,
    error: confirmedPasswordError,
    inputChangeHandler: confirmedPasswordChangeHandler,
    blurEventHandler: confirmedPasswordBlur,
    reset: resetConfirmedPassword,
    isTouched: isConfirmedPasswordTouched,
  } = useInput((confirmedPassword) => validatePassword(confirmedPassword));

  const {
    value: age,
    error: ageError,
    inputChangeHandler: ageChangeHandler,
    blurEventHandler: ageBlur,
    reset: resetAge,
    isTouched: isAgeTouched,
  } = useInput((age) => validate(age));

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();

    if (nameError || passwordError || emailError || confirmedPasswordError)
      return;

    const passwordMatch = validateConfirmedPassword(
      password,
      confirmedPassword
    );
    if (!passwordMatch) throw new Error("Password not match!");

    const form = {
      name,
      email,
      password,
      age,
    };

    await onSubmit(form);

    reset();
  };

  const reset = () => {
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmedPassword();
    resetAge();
  };

  return (
    <form
      id="signup-form"
      className="signup_form min-h-full flex flex-col"
      onSubmit={signUpFormSubmitHandler}
    >
      <div className="mx-auto w-2/5 flex flex-col items-center justify-center px-2">
        <div className="form-group form-check px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center text-white">Sign up</h1>
          <Input
            error={nameError && isNameTouched}
            type={inputTypes.TEXT}
            id={inputConstant.NAME}
            name={inputConstant.NAME}
            placeholder="Full Name"
            value={name}
            inputChangeHandler={nameChangeHandler}
            blurHandler={nameBlur}
            isRequired
          />
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
          <Input
            error={confirmedPasswordError && isConfirmedPasswordTouched}
            type={inputTypes.PASSWORD}
            id={inputConstant.CONFIRMED_PASSWORD}
            name={inputConstant.CONFIRMED_PASSWORD}
            placeholder="Confirm Password"
            value={confirmedPassword}
            inputChangeHandler={confirmedPasswordChangeHandler}
            blurHandler={confirmedPasswordBlur}
            isRequired
          />
          <Input
            error={ageError && isAgeTouched}
            type={inputTypes.NUMBER}
            id={inputConstant.AGE}
            name={inputConstant.AGE}
            placeholder="Age"
            value={age}
            inputChangeHandler={ageChangeHandler}
            blurHandler={ageBlur}
            isRequired
          />
          <button
            type="submit"
            className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Create Account
          </button>
        </div>
        <div>
          Already have an account?
          <Link href="/auth/login">
            <a className="no-underline hover:underline text-blue">Log In</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
