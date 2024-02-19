import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import axios from "axios";

export default function NewComponent() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.target);
    form.set("title", form.get("title"));
    form.set("label", form.get("label"));
    form.set("preface", form.get("preface"));
    form.set("content", form.get("content"));
    console.log(form.get("content"));
    try {
      const token = sessionStorage.getItem("token");
      await axios.postForm(`http://localhost:3333/create-blog`, form, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (err) {
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

  const styleLabel = css({
    fontSize: 21,
    mb: 2,
  });

  return (
    <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
      <div className={styleContainer}>
        <p className={styleLabel}>Title</p>
        <input
          placeholder="Enter your title of blog"
          type="text"
          name="title"
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Labels</p>
        <input placeholder="Enter labels" type="text" name="label" />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Preface</p>
        <input placeholder="Enter the preface" type="text" name="preface" />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Content</p>
        <input
          placeholder="Enter your title of blog"
          type="file"
          name="content"
        />
      </div>
      <button type="submit">Add content</button>
    </form>
  );
}
