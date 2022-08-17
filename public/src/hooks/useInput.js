import { useReducer } from "react";

const initialData = {
  value: "",
  isTouched: false,
};

export const INPUT = "INPUT";
export const RESET = "RESET";
export const BLUR = "BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT:
      return {
        ...state,
        value: action.value,
      };
    case BLUR:
      return {
        ...state,
        isTouched: true,
      };
    case RESET:
      return initialData;
    default:
      return state;
  }
};

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialData);

  const valueIsValid = validate(inputState.value);
  const error = !valueIsValid;

  const inputChangeHandler = (event, val) => {
    event.preventDefault();
    dispatch({ type: INPUT, value: val || event.target.value });
  };

  const initiateValueHandler = (value) => {
    dispatch({ type: INPUT, value: value });
  };

  const blurEventHandler = (e) => {
    e.preventDefault();
    dispatch({ type: BLUR });
  };

  const reset = () => dispatch({ type: RESET });

  return {
    value: inputState.value,
    error,
    inputChangeHandler,
    blurEventHandler,
    isTouched: inputState.isTouched,
    reset,
    initiateValueHandler,
  };
};

export default useInput;
