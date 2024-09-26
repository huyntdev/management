const IconPlus = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.75 1.25C4.75 0.835786 4.41421 0.5 4 0.5C3.58579 0.5 3.25 0.835786 3.25 1.25L3.25 3.75H0.75C0.335786 3.75 0 4.08579 0 4.5C0 4.91421 0.335786 5.25 0.75 5.25H3.25L3.25 7.75C3.25 8.16421 3.58579 8.5 4 8.5C4.41421 8.5 4.75 8.16421 4.75 7.75V5.25H7.25C7.66421 5.25 8 4.91421 8 4.5C8 4.08579 7.66421 3.75 7.25 3.75H4.75V1.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconPlus;
