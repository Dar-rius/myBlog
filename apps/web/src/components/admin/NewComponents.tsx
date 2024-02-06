import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import { request, response } from "undici";
import React, { useRef } from "react";

export default function NewComponent() {
  let title = useRef("");
  let tags = useRef("");
  let preface = useRef("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        title: title.current,
        tags: tags.current,
        preface: preface.current,
      };
      console.log(data);
      //await request(`http://localhost:3333/json`, {
      //method: "POST",
      //headers: { "content-type": "application/json" },
      //body: JSON.stringify({ data }),
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
    <form onSubmit={handleSubmit}>
      <div className={styleContainer}>
        <p className={styleLabel}>Title</p>
        <input
          placeholder="Enter your title of blog"
          type="text"
          name="title"
          onChange={(e) => (title.current = e.target.value)}
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Tags</p>
        <input
          placeholder="Enter tags"
          type="text"
          name="tags"
          onChange={(e) => (title.current = e.target.value)}
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Preface</p>
        <input
          placeholder="Enter the preface"
          type="text"
          name="preface"
          onChange={(e) => (preface.current = e.target.value)}
        />
      </div>
      <button type="submit">Add content</button>
    </form>
  );
}
