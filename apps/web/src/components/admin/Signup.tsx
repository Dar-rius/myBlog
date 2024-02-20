import { css } from "../../../styled-system/css";
import { center, flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import axios from "axios";

export default function SignupComponent() {
  // variable
  let username = useRef("");
  let password = useRef("");
  let email = useRef("");
  let password2 = useRef("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    await axios
      .post(
        `http://127.0.0.1:3333/signup`,
        {
          username: username.current,
          email: email.current,
          password: password.current,
          password2: password2.current,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
      })
      .catch((error) => {
        if (error.response) {
          // La requête a été faite, mais le serveur a répondu avec un code d'erreur
          console.error("Erreur serveur:", error.response.data);
        } else if (error.request) {
          // La requête a été faite, mais aucune réponse n'a été reçue
          console.error("Aucune réponse du serveur");
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error("Erreur de configuration de la requête", error.message);
        }
      });
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

      <form onSubmit={handleSubmit} id="form1">
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
            name="password2"
            onChange={(e) => (password2.current = e.target.value)}
          />
        </div>
        <button type="submit" form="form1">
          Sign up
        </button>
      </form>
    </center>
  );
}
