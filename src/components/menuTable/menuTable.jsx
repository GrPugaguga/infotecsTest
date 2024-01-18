import React, { useEffect, useRef, useState } from "react";

import MenuColumn from "../menuColumn/menuColumn.jsx";
import Sort from "../sort/sort.jsx";

const MenuTable = ({
  style,
  setGrid,
  grid,
  setActiveRef,
  isResize,
  setElem,
  setSortMethod,
  ...props
}) => {
  return (
    <>
      {["ФИО", "Возраст", "Пол", "Номер телефона", "Адрес"].map((e, index) => (
        <MenuColumn
          key={index}
          style={style}
          className="menu"
          setActiveRef={setActiveRef}
          isResize={isResize}
          setElem={setElem}
          arrGrid={grid}
          setArrGrid={setGrid}
        >
          {e} <Sort setSortMethod={setSortMethod} type={e} />
        </MenuColumn>
      ))}
    </>
  );
};

export default MenuTable;
