import React from "react";

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
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

  return <div>{target}</div>;
}
