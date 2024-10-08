const IconTag = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.02469 0H8.74998C10.5449 0 12 1.45507 12 3.25V5.18774C12 5.86655 11.724 6.51617 11.2353 6.98735L6.76716 11.2959C5.78602 12.242 4.22784 12.2279 3.26406 11.2641L0.735896 8.73592C-0.227887 7.77214 -0.242052 6.21396 0.704051 5.23281L4.86516 0.917592C5.43058 0.331232 6.21012 0 7.02469 0ZM8.99998 4C9.55226 4 9.99998 3.55228 9.99998 3C9.99998 2.44772 9.55226 2 8.99998 2C8.44769 2 7.99998 2.44772 7.99998 3C7.99998 3.55228 8.44769 4 8.99998 4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconTag;
