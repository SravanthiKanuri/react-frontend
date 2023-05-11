import React, { useState } from "react";
//import logo from "./logo.svg";
//import { Counter } from "./features/counter/Counter";


function Practice() {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [index, setIndex] = useState(0)
  const [data1, setData1] = useState([
    "sravanthi",
    "bhaskar",
    "varshith Nandan",
    "chaitra nandan",
    "Dhanalaxmi"
  ]);
  let name1;
  const [data2, setData2] = useState(data1);
  function changeHandler(e) {
    name1 = e.target.value;
    setName(name1)
  }

  function onAdd(e) {
    e.preventDefault();
    setData(name);
    data1.push(name);
  }

  function searchHandler(e) {
    const text = e.target.value.toLowerCase();
    const filteredData = data2.filter((each) => {
      return each.toLowerCase().includes(text);
    });
    setData1(filteredData);
  }

  function onEdit(e, i) {
    setIsEdit(true);
    setData(e);
    setIndex(i)
    // console.log(e)
  }
  function submitEdit(e) {
    e.preventDefault();
   
   data1.splice(index, 1, data)
   console.log(data1)
   setIsEdit(false)

  }

  function onDelete(index) {
    const deletedData = data1.filter((each, i) => {
      if (index !== i) {
        return each;
      }
    });
    setData1(deletedData);
  }

  return (
    <>
      <div>
        <input type="text" placeholder="enter name" onChange={changeHandler} />
        <button onClick={(e) => onAdd(e)}>add</button>
        <br />

        <input
          type="search"
          placeholder="search here"
          onChange={searchHandler}
        />
        <br />

        <ul>
          {data1.map((each, index) => {
            return (
              <li key={index}>
                {each}
                <button onClick={() => onDelete(index)}>delete </button>
                <button onClick={() => onEdit(each, index)}>edit</button>
                
       
              </li>
            );
          })}
           {isEdit ? (
          <>
          <input
            type="text"
            placeholder="edit"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button onClick={(e)=>submitEdit(e)}>submit</button>
          </>
        ) : null}
        </ul>
      </div>
    </>
  );
}

export default Practice;