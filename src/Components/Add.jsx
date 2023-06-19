import React from "react";
import { useState } from "react";
export default function Add(props) {
  let [temp, setTemp] = useState("");
  function add() {
    let count = 1;
    if (localStorage.getItem("count") >= 1) {
      count = localStorage.getItem("count");
      count++;
      localStorage.setItem("count", count);
    } else {
      localStorage.setItem("count", count);
      count++;
    }

    let newToDO = [
      ...props.toDo,
      {
        id: count,
        title: temp,
        isEditable: false
      }
    ];

    props.setToDo(newToDO);
    localStorage.setItem("ToDO", JSON.stringify(newToDO));
    setTemp("");
  }

  return (
    <>
      <input
        id="ToDo"
        className="note"
        type="text"
        placeholder="Enter your Note here"
        value={temp}
        onChange={(e) => {
          setTemp(e.target.value);
        }}
      />
      <button onClick={add}>Add</button>
    </>
  );
}
