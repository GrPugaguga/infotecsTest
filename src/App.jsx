import "./App.css";
import React, { useState } from "react";
import ModalPopup from "./components/modalPopup/modalPopup";
import Table from "./components/table/table";

function App() {
  // Переменные для модального окна
  const [modalPopup, setModalPopup] = useState(false);

  return (
    <div className="App">
      <Table
        setModalPopup={setModalPopup}
        modalPopup={!!modalPopup}
        style={!!modalPopup ? { filter: "blur(7px)" } : {}}
      />
      {!!modalPopup ? (
        <ModalPopup modalPopup={modalPopup} setModalPopup={setModalPopup} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
