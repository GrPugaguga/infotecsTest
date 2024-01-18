import React, { useEffect, useRef, useState } from "react";
import useWindowResize from "../../helpers/hooks/useWindowResize";
import "./menuColumn.css";

const MenuColumn = ({
  style,
  className,
  setActiveRef,
  isResize,
  setElem,
  arrGrid,
  setArrGrid,
  children,
  ...props
}) => {
  const ref = useRef();
  const defineElem = (text) => {
    switch (text) {
      case "Ф":
        return 0;
      case "В":
        return 1;
      case "П":
        return 2;
      case "Н":
        return 3;
      case "А":
        return 4;
      default:
        return "error";
    }
  };

  useEffect(() => {
    const arr = arrGrid;
    arr[defineElem(ref.current.outerText[0])] = ref.current?.offsetWidth;
    setArrGrid(arr);
  }, [useWindowResize()]);
  //Передача ширины каждого элемента при изменении окна браузера для правильного построения сетки грид в компоненте table.jsx

  return (
    <div
      style={style}
      className={`column ${className}`}
      ref={ref}
      onMouseOver={() => {
        if (isResize) {
          return;
        }
        setActiveRef(ref);
        setElem(defineElem(ref.current.outerText[0]));
      }}
    >
      {children}
    </div>
  );
};

export default MenuColumn;
