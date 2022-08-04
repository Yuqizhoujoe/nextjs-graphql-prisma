import { inputTypes } from "../../shared/constant";

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
  ...rest
}) => {
  let className =
    "form-control w-full border border-grey-light text-white p-3 rounded";
  if (style) className = style;

  const renderInput = () => {
    if (type === inputTypes.TEXTAREA) {
      return (
        <textarea
          id={id}
          name={name}
          rows="4"
          className="block p-2.5 w-full text-sm text-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required={isRequired}
          value={value}
          onChange={inputChangeHandler}
          onBlur={blurHandler}
          {...rest}
        ></textarea>
      );
    }

    return (
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={className}
        required={isRequired}
        value={value}
        onChange={inputChangeHandler}
        onBlur={blurHandler}
        {...rest}
      />
    );
  };

  return (
    <div className="mb-4">
      {renderInput()}
      {error && (
        <span className="text-red-200 font-body inline-block">
          Invalid {name}
        </span>
      )}
    </div>
  );
};

export default Input;
