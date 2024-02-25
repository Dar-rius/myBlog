import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useState } from "react";
import axios from "axios";
import { url } from "../../utils";

export default function NewComponent() {
  const [message, setMessage] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.target);
    form.set("title", form.get("title"));
    form.set("label", form.get("label"));
    form.set("preface", form.get("preface"));
    form.set("content", form.get("content"));
    try {
      const token = sessionStorage.getItem("token");
      await axios.postForm(`http://localhost:3333/create-blog`, form, {
        headers: { authorization: `Bearer ${token}` },
      });
      window.location = `${url}/admin/edit`;
    } catch (err) {
      setMessage("A field is not entered correctly");
      console.error(err.response);
    }
  }
  //style
  const styleContainer = flex({
    direction: "column",
    mx: "35%",
    alignItems: "flex-start",
    my: "3%",
  });

  const styleLabel = css({ fontSize: 21, mb: 2 });

  return (
    <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
      <div className={styleContainer}>
        <p className={styleLabel}>Title</p>
        <input
          placeholder="Enter your title of blog"
          type="text"
          name="title"
          required
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Labels</p>
        <input placeholder="Enter labels" type="text" name="label" required />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Preface</p>
        <input
          placeholder="Enter the preface"
          type="text"
          name="preface"
          required
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Content</p>
        <input
          placeholder="Enter your title of blog"
          type="file"
          name="content"
          required
        />
      </div>
      <p className={css({ color: "red.300" })}>{message}</p>
      <button type="submit">Add content</button>
    </form>
  );
}
