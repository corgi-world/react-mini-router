import React from "react";
import useRouter from "../../hooks/useRouter";

export default function Root() {
  const { push } = useRouter();
  return (
    <div>
      <h1>Root</h1>
      <button
        onClick={() => {
          push("/about");
        }}
      >
        about으로 이동
      </button>
    </div>
  );
}
