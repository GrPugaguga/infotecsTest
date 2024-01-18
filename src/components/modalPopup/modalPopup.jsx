import React from "react";
import "./modalPopup.css";

const ModalPopup = ({ modalPopup, setModalPopup, ...props }) => {
  console.log(props);
  return (
    <div className="modalPopup">
      <div className="name">{`${modalPopup.firstName} ${modalPopup.lastName} ${modalPopup.maidenName}`}</div>
      <div className="info">{`age:${modalPopup.age} height:${modalPopup.height} weight:${modalPopup.weight}`}</div>
      <div className="phone">{modalPopup.phone}</div>
      <div className="email">{modalPopup.email}</div>
      <button onClick={() => setModalPopup(false)}>Close</button>
    </div>
  );
};

export default ModalPopup;
