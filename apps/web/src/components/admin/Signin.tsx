import { css } from "../../../styled-system/css";
import { center, flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import axios from "axios";

export default function SigninComponent() {
  // variable
  let email = useRef("");
  let password = useRef("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:3333/signin`,
        {
          email: email.current,
          password: password.current,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.error(err.response));
  }

  // styles
  const styleContainer = flex({
    direction: "column",
    mx: "35%",
    alignItems: "flex-start",
    my: "3%",
  });

  const styleLabel = css({
    fontSize: 21,
    mb: 2,
  });
  return (
    <center className={css({ mb: "9.5%" })}>
      <h2
        className={css({
          fontWeight: "500",
          mt: "3%",
        })}
      >
        Sign in
      </h2>

      <form onSubmit={handleSubmit} id="form1">
        <div className={styleContainer}>
          <p className={styleLabel}>Adress mail</p>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <div className={styleContainer}>
          <p className={styleLabel}>Password</p>
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={(e) => (password.current = e.target.value)}
          />
        </div>
        <button type="submit" form="form1">
          Sign in
        </button>
      </form>
    </center>
  );
}