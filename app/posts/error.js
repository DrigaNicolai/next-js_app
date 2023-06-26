'use client'; // Error component must be client-side

import { useEffect } from "react";

const Error = ({error, reset}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
