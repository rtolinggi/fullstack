const CheckBox = ({ children, ...props }) => {
  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="accent-teal-600 outline-none focus:ring-[1px] focus:ring-teal-500"
          {...props}
        />
        <label className="ml-1 text-sm text-slate-700 font-normal ">
          {children}
        </label>
      </div>
    </>
  );
};

export default CheckBox;
