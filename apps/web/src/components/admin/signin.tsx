import { css } from "../../../styled-system/css";
import { center, flex } from "../../../styled-system/patterns";
import { request, response } from "undici";
import React, { useRef } from "react";

export default function SigninComponent() {
  // variable
  let email = useRef("");
  let password = useRef("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        email: email.current,
        password: password.current,
      };
      console.log(data);
      await request(`http://localhost:3333/json`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data }),
      });
    } catch (err) {
      console.error(err);
    }
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
    <center class={css({ mb: "9.5%" })}>
      <h2
        class={css({
          fontWeight: "500",
          mt: "3%",
        })}
      >
        Sign in
      </h2>

      <form method="post" onSubmit={handleSubmit} id="form1">
        <div class={styleContainer}>
          <p class={styleLabel}>Adress mail</p>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={(e) => (email.current = e.target.value)}
          />
        </div>
        <div class={styleContainer}>
          <p class={styleLabel}>Password</p>
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
