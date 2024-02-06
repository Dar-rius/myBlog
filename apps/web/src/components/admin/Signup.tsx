import { css } from "../../../styled-system/css";
import { center, flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import { request, response } from "undici";

export default function SignupComponent() {
  // variable
  let username = useRef("");
  let password = useRef("");
  let email = useRef("");
  let password_2 = useRef("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        username: username.current,
        email: email.current,
        password: password.current,
        password_2: password_2.current,
      };
      console.log(data);
      //await request(`http://localhost:3333/`, {
      //  method: "POST",
      // headers: { "content-type": "application/json" },
      // body: JSON.stringify({ data }),
      //});
    } catch (err) {
      console.error(err);
    }
  }

  //style
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
    <center class={css({ mb: "7%" })}>
      <h2
        class={css({
          fontWeight: "500",
          mt: "3%",
        })}
      >
        Sign up
      </h2>

      <form method="post" onSubmit={handleSubmit}>
        <div className={styleContainer}>
          <p className={styleLabel}>Username</p>
          <input
            placeholder="Enter your username"
            type="text"
            name="username"
            onChange={(e) => (username.current = e.target.value)}
          />
        </div>
        <div className={styleContainer}>
          <p className={styleLabel}>Adress mail</p>
          <input
            placeholder="Enter your address mail"
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
        <div className={styleContainer}>
          <p className={styleLabel}>Verify password</p>
          <input
            placeholder="Enter again your password"
            type="password"
            name="password_2"
            onChange={(e) => (password_2.current = e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </center>
  );
}
