import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import axios from "axios";

export default function EditFirst(id: { id: number }) {
  // variable
  let title = useRef("");
  let tags = useRef("");
  let preface = useRef("");
  const _id = id.id;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        title: title.current,
        tags: tags.current,
        preface: preface.current,
      };
      console.log(data);
      const token = sessionStorage.getItem("token");
      await axios.post(`http://localhost:3333/edit-blog-data/${_id}`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
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
          value={title.current}
          onChange={(e) => (title.current = e.target.value)}
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Tags</p>
        <input
          placeholder="Enter tags"
          type="text"
          name="tags"
          value={tags.current}
          onChange={(e) => (tags.current = e.target.value)}
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Preface</p>
        <input
          placeholder="Enter the preface"
          type="text"
          name="preface"
          value={preface.current}
          onChange={(e) => (preface.current = e.target.value)}
        />
      </div>
      <div>
        <button
          className={css({
            px: "3%",
            mr: "2%",
          })}
          type="submit"
        >
          Modify content
        </button>

        <button
          className={css({
            bg: "#E74C3C",
            ml: "2%",
          })}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
