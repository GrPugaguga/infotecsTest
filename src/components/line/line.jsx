import React from "react";
import "./line.css";
import Column from "../column/column.jsx";

const Line = ({ setModalPopup, modalPopup, ...props }) => {
  return (
    <div
      className="line"
      //благодаря свойству display:contents не мешает гриду элемента table.jsx
      //и позволяет повесить слушатель на всю строку
      onClick={() => {
        if (modalPopup) return;
        setModalPopup(props);
      }}
    >
      <Column className="fio">{`${props.firstName} ${props.lastName} ${props.maidenName}`}</Column>
      <Column className="age">{props.age}</Column>
      <Column className="gender">{props.gender}</Column>
      <Column className="phone">{props.phone}</Column>
      <Column className="address">{`${
        props.address.city ? props.address.city : ""
      } ${props.address.address}`}</Column>
    </div>
  );
};

export default Line;
