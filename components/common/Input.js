import { inputConstant, inputTypes } from "../../shared/constant";
import Switch from "@mui/material/Switch";
import { Fragment } from "react";
import CurrencyInput from "react-currency-input-field";

const Input = ({
  id,
  name,
  type,
  placeholder,
  isRequired,
  value,
  inputChangeHandler,
  blurHandler,
  style,
  error,
  textLimit,
  ...rest
}) => {
  let className =
    "block py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  if (style) className = style;

  const renderInput = () => {
    if (id === inputConstant.PRICE) {
      return (
        <Fragment>
          <CurrencyInput
            prefix={placeholder}
            name={name}
            id={id}
            data-number-to-fixed="2"
            data-number-stepfactor="100"
            value={value ? value : ""}
            placeholder=""
            onChange={inputChangeHandler}
            onBlur={blurHandler}
            allowDecimals
            decimalsLimit="2"
            disableAbbreviations
            className={className.concat(" w-1/2")}
            required={isRequired}
          />
          <label
            htmlFor={id}
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {placeholder}
          </label>
        </Fragment>
      );
    }
    switch (type) {
      case inputTypes.TEXTAREA:
        return (
          <Fragment>
            <textarea
              id={id}
              name={name}
              rows={6}
              className="block p-2.5 w-full text-sm text-white bg-gray-700 placeholder-gray-400 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
              required={isRequired}
              value={value}
              onChange={inputChangeHandler}
              onBlur={blurHandler}
              maxLength={textLimit}
              {...rest}
            ></textarea>
            <span className="block float-right text-white">
              {value.length}/{textLimit}
            </span>
          </Fragment>
        );
      case inputTypes.CHECK_BOX:
        return (
          <Fragment>
            <Switch
              checked={value}
              color="warning"
              className="bg-zinc-800 rounded-lg"
              onChange={inputChangeHandler}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span className="inline-block text-white p-2 font-semibold">
              Published
            </span>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <input
              type={type}
              name={name}
              id={id}
              value={value}
              className={className.concat(" w-full")}
              onBlur={blurHandler}
              onChange={inputChangeHandler}
              required={isRequired}
              placeholder=" "
            />
            <label
              htmlFor={id}
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {placeholder}
            </label>
          </Fragment>
        );
    }
  };

  return (
    <div className="relative z-0 mb-6 w-full group">
      {renderInput()}
      {error && (
        <span className="text-red-700 text-sm font-light inline-block">
          Invalid {name}
        </span>
      )}
    </div>
  );
};

export default Input;
