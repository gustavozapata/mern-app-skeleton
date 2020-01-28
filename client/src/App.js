import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const countryRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const availableRef = useRef();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    setLoading(true);
    axios
      .get("http://localhost:4000/db/getAll")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const insertOne = () => {
    if (nameRef.current.value !== "") {
      setLoading(true);
      const newProduct = {
        name: nameRef.current.value,
        country: countryRef.current.value,
        category: categoryRef.current.value,
        price: priceRef.current.value,
        available: availableRef.current.value
      };

      nameRef.current.value = "";
      countryRef.current.value = "";
      categoryRef.current.value = "";
      priceRef.current.value = "";
      availableRef.current.value = "";

      axios
        .post("http://localhost:4000/db/insertOne", { ...newProduct })
        .then(res => {
          getAll();
          console.log(res.data.description);
        });
    }
  };
  const writeAll = () => {
    setLoading(true);
    axios.post("http://localhost:4000/db/writeAll").then(res => {
      getAll();
      console.log(res.data.description);
    });
  };
  const deleteAll = () => {
    setLoading(true);
    axios.delete("http://localhost:4000/db/deleteAll").then(res => {
      getAll();
      console.log(res.data.description);
    });
  };
  const deleteOne = e => {
    setLoading(true);
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
        <tfoot>
          <tr className="add-product">
            <td>
              <input type="text" name="name" ref={nameRef} required />
            </td>
            <td>
              <input type="text" name="country" ref={countryRef} />
            </td>
            <td>
              <input type="text" name="category" ref={categoryRef} />
            </td>
            <td>
              <input type="text" name="price" ref={priceRef} />
            </td>
            <td>
              <input type="text" name="available" ref={availableRef} />
            </td>
            <td className="add-button">
              <button onClick={insertOne}>Add</button>
            </td>
          </tr>
        </tfoot>
      </table>
      {loading && <p>Loading...</p>}
      <button onClick={writeAll}>Write All</button>
      <button onClick={deleteAll}>Delete All</button>
    </div>
  );
}

export default App;
