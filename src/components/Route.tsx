import React from "react";

interface RouteProps {
  path: string;
  component: JSX.Element;
}

export default function Route({ path, component }: RouteProps) {
  return component;
}
