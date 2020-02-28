import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", login)
      .then(res => {
        console.log(res);
        window.localStorage.setItem("token", res.data.payload);
        history.push("/creatures");
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(login);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username
          <input
            type="text"
            name="username"
            label="username"
            value={props.name}
            onChange={handleChange}
            className="input"
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            label="password"
            value={props.password}
            onChange={handleChange}
            className="input"
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
