import React, { useRef } from "react";
import MenuTable from "../menuTable/menuTable";
import Loader from "../loader/loader";
import Search from "../search/search";
import Line from "../line/line.jsx";
import { useState, useEffect } from "react";
import "./table.css";

const Table = ({ setModalPopup, modalPopup, style, ...props }) => {
  //Основные переменные для запросов
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Переменные для изменения ширины столбцов
  const [isBorder, setIsBorder] = useState(false);
  const [isResize, setIsResize] = useState(false);
  const [activeRef, setActiveRef] = useState();
  const [elem, setElem] = useState(0);
  const [grid, setGrid] = useState(["auto", "auto", "auto", "auto", "auto"]);
  const arr = Object.assign([], grid);

  //Переменные для сортировки
  const [sortMethod, setSortMethod] = useState("default");
  const uArr = Object.assign([], users);
  const [defaultUsersSArray, setDefaultUsersSArray] = useState([]);

  //Стартовое получение массива
  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users?limit=0")
      .then((res) => res.json())
      .then((u) => {
        setUsers(u.users);
        setDefaultUsersSArray(u.users);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  // Получение нового массива при изменении запроса
  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/users/search?limit=0&q=${query}`)
      .then((res) => res.json())
      .then((u) => {
        setUsers(u.users);
        setDefaultUsersSArray(u.users);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [query]);

  //Сортировка массива при выборе метода в компоненте sort.jsx
  //(Компонент возвращает нам строку типом сортировки и названием выбранного столбца)
  useEffect(() => {
    if (sortMethod?.split(" ")[0] === "default") {
      setUsers(defaultUsersSArray);
      return;
    }
    uArr.sort((a, b) => {
      switch (sortMethod?.split(" ")[1]) {
        case "address":
          if (
            a[sortMethod.split(" ")[1]].city > b[sortMethod.split(" ")[1]].city
          ) {
            return Number(`${sortMethod?.split(" ")[0]}1`) * 1;
          } else {
            return Number(`${sortMethod?.split(" ")[0]}1`) * -1;
          }
        default:
          if (a[sortMethod.split(" ")[1]] > b[sortMethod.split(" ")[1]]) {
            return Number(`${sortMethod?.split(" ")[0]}1`) * 1;
          } else {
            return Number(`${sortMethod?.split(" ")[0]}1`) * -1;
          }
      }
    });
    setUsers(uArr);
  }, [sortMethod]);

  return (
    <div className="table" style={style}>
      <Search setQuery={setQuery} />
      <div
        //Значение первого элемента равно 1fr так как иначе при всех числовых значениях
        //появляется разница и элементы вылезают за рамки своей таблицы

        //При данном методе изменения ширины колонок таблицы появился недостаток того,
        //что разметка не изменяется при изменении ширины окна.
        //В остальном дополнительное задание работает полностью

        //Если удалить элемент стайл то ширина таблицы будет согласно заданию 100%(мах 1200px)
        style={{
          gridTemplateColumns: `1fr ${grid[1]}px ${grid[2]}px ${grid[3]}px ${grid[4]}px`,
        }}
        className="users"
        onMouseMove={(e) => {
          setIsBorder(false);
          if (isResize) {
            if (elem === 0 || elem === 5) return;

            //Подсчет значений
            const summ = arr[elem] + arr[elem - 1];
            arr[elem] += activeRef?.current.offsetLeft - e.clientX;
            arr[elem - 1] -= activeRef?.current.offsetLeft - e.clientX;

            //Ограничение на минимальную ширину 50px
            if (arr[elem] < 50) {
              arr[elem] = 50;
              arr[elem - 1] = summ - 50;
            }
            if (arr[elem - 1] < 50) {
              arr[elem - 1] = 50;
              arr[elem] = summ - 50;
            }
            //Определение новой сетки
            setGrid(arr);
            return;
          }
          if (e.clientX === activeRef?.current?.offsetLeft) {
            setIsBorder(true);
          }
        }}
        onMouseDown={(e) => {
          if (!isBorder) {
            return;
          }
          //Разрешение на начало изменений ширины
          setIsResize(true);
        }}
        //Его отмена
        onMouseUp={() => {
          setIsResize(false);
        }}
        onMouseLeave={() => {
          setIsResize(false);
        }}
      >
        <MenuTable
          style={
            isBorder || isResize
              ? { cursor: "ew-resize", userSelect: "none" }
              : {}
          }
          setGrid={setGrid}
          grid={grid}
          setActiveRef={setActiveRef}
          isResize={isResize}
          setElem={setElem}
          setSortMethod={setSortMethod}
        />
        {isLoading && <Loader />}
        {!isLoading &&
          users.map((e) => (
            <Line
              {...e}
              key={e.id}
              setModalPopup={setModalPopup}
              modalPopup={modalPopup}
            />
          ))}
      </div>
    </div>
  );
};

export default Table;
