import React, { useEffect } from "react";
import pathAtom from "../atoms/pathAtom";
import { useRecoilState } from "recoil";

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
  const [path, setPath] = useRecoilState(pathAtom);

  useEffect(() => {
    const handleOnPopstate = (event: PopStateEvent) => {
      const {
        state: { path },
      } = event;

      setPath(path);
    };

    window.addEventListener("popstate", handleOnPopstate);

    return () => {
      window.removeEventListener("popstate", handleOnPopstate);
    };
  }, [setPath]);

  const target = React.Children.map(children, (child) => {
    if (React.isValidElement<{ path: string }>(child)) {
      const {
        props: { path },
      } = child;

      if (path === window.location.pathname) {
        return child;
      }
    }
  });

  return <>{target}</>;
}
