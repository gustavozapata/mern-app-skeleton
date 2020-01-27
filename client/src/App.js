import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    axios
      .get("http://localhost:4000/db/getAll")
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const writeAll = () => {
    axios.post("http://localhost:4000/db/writeAll").then(res => {
      getAll();
      console.log(res.data.description);
    });
  };
  const deleteAll = () => {
    axios.delete("http://localhost:4000/db/deleteAll").then(res => {
      getAll();
      console.log(res.data.description);
    });
  };
  const deleteOne = e => {
    axios
      .delete(`http://localhost:4000/db/deleteOne/${e.target.id}`)
      .then(res => {
        getAll();
        console.log(res.data.description);
      });
  };

  return (
    <div className="App">
      <h1>React / Node Express / Mongo</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((el, i) => (
              <tr key={i}>
                <td>{el.name}</td>
                <td>{el.country}</td>
                <td>{el.category}</td>
                <td>${el.price}</td>
                <td>{el.available ? "Yes" : "No"}</td>
                <td>
                  <button id={el.name} onClick={deleteOne}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>data not available</p>
          )}
        </tbody>
      </table>
      <button onClick={writeAll}>Write All</button>
      <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
