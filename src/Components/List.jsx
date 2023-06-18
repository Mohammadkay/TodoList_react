import "./list.css";
import React, { useEffect, useState } from "react";

function List() {
  const [toDo, setToDo] = useState(() => {
    if (localStorage.getItem("ToDO") !== null) {
      return JSON.parse(localStorage.getItem("ToDO"));
    } else {
      return [];
    }
  });
  let temp = "";
  let tempEdit = "";

  useEffect(() => {
    localStorage.setItem("ToDO", JSON.stringify(toDo));
  }, [toDo]);

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
      ...toDo,
      {
        id: count,
        title: temp,
        isEditable: false
      }
    ];
    setToDo(newToDO);
    localStorage.setItem("ToDO", JSON.stringify(newToDO));
  }

  function Delete(e) {
    setToDo(toDo.filter((ele) => ele.id !== e));
    localStorage.setItem("ToDO", JSON.stringify(toDo));
  }
  function handleEdit(item) {
    const updatedToDo = toDo.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          isEditable: true
        };
      }
      return e;
    });
    setToDo(updatedToDo);
  }
  function Edit(temp, item) {
    const updatedToDo = toDo.map((e) => {
      if (e.id === item) {
        return {
          ...e,
          title: temp,
          isEditable: false
        };
      }
      return e;
    });
    setToDo(updatedToDo);
  }

  return (
    <div className="container">
      <div className="card">
        <div>
          <h1>TO DO</h1>
        </div>
        <hr />
        <div
          className="column"
          id="mylist"
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "18px"
          }}
        >
          {toDo.map((item) => {
            if (item.isEditable) {
              return (
                <div key={item.id}>
                  <input
                    type="text"
                    onChange={(e) => (tempEdit = e.target.value)}
                  />
                  <button onClick={() => Edit(tempEdit, item.id)}>Edit</button>
                  <button onClick={() => Delete(item.id)}>Delete</button>
                </div>
              );
            } else {
              return (
                <div key={item.id}>
                  <p>{item.title}</p>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => Delete(item.id)}>Delete</button>
                </div>
              );
            }
          })}
        </div>
        <div>
          <input
            id="ToDo"
            className="note"
            type="text"
            placeholder="Enter your Note here"
            onChange={(e) => {
              temp = e.target.value;
            }}
          />
          <button onClick={add}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default List;
