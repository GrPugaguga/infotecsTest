import React from "react";
import "./column.css";

const Column = ({ className, children, ...props }) => {
  return <div className={`column ${className}`}>{children}</div>;
};

export default Column;
