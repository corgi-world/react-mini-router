import React from "react";
import useRouter from "../../hooks/useRouter";

export default function About() {
  const { push } = useRouter();
  return (
    <div>
      <h1>About</h1>
      <button
        onClick={() => {
          push("/");
        }}
      >
        root로 이동
      </button>
    </div>
  );
}
