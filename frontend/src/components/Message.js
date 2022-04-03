import { ExclamationIcon, XCircleIcon } from "@heroicons/react/solid";

const Message = ({ classContiner, message, onClick, classMessage }) => {
  return (
    <>
      <div
        id="message"
        className={`flex items-center p-2.5 -mb-4 bg-red-100 rounded-sm dark:bg-red-200 w-full mt-4 border-l-4 border-l-red-400 ${classContiner}`}
      >
        <ExclamationIcon className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
        <div
          className={`ml-3 text-xs -tracking-tighter font-medium text-red-700 dark:text-red-800 ${classMessage}`}
        >
          {message}
        </div>
        <button
          type="button"
          onClick={onClick}
          className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Message;
