import React from "react";
import "./sort.css";
const Sort = ({ setSortMethod, type, ...props }) => {
  const interpretationOfType = (text) => {
    switch (text) {
      case "ФИО":
        return "firstName";
      case "Возраст":
        return "age";
      case "Пол":
        return "gender";
      case "Номер телефона":
        return "phone";
      case "Адрес":
        return "address";

      default:
        break;
    }
  };

  return (
    <select
      className="sort"
      onChange={(e) =>
        setSortMethod(`${e.target.value} ${interpretationOfType(type)}`)
      }
    >
      <option value="default"></option>
      <option value="+">↓</option>
      <option value="-">↑</option>
    </select>
  );
};

export default Sort;
