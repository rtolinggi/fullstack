const Button = ({
  type = "submit",
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`text-white outline-none bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-8 py-2.5 w-full mr-2 mt-6 lg:w-fit lg:self-start ${className}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
