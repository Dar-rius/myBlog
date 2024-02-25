import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utils";

export default function EditFirst(id: { id: number }) {
  // variable
  const _id = id.id;
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3333/blog/${_id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`http://localhost:3333/edit-blog-data/${_id}`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
      window.location = `${url}/admin/edit`;
    } catch (err) {
      setMessage("A field is not entered correctly");
      console.error(err);
    }
  }

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:3333/delete-blog/${_id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      window.location = "http://localhost:4321/admin/edit";
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
          defaultValue={data.title}
          onChange={(e) => (data.title = e.target.value)}
          required
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Tags</p>
        <input
          placeholder="Enter tags"
          type="text"
          name="label;"
          defaultValue={data.label}
          onChange={(e) => (data.label = e.target.value)}
          required
        />
      </div>
      <div className={styleContainer}>
        <p className={styleLabel}>Preface</p>
        <input
          placeholder="Enter the preface"
          type="text"
          name="preface"
          defaultValue={data.preface}
          onChange={(e) => (data.preface = e.target.value)}
          required
        />
      </div>
      <p className={css({ color: "red.300" })}>{message}</p>
      <div>
        <button
          className={css({
            px: "3%",
            mr: "2%",
          })}
          type="submit"
        >
          Modify
        </button>

        <button
          className={css({
            bg: "#E74C3C",
            ml: "2%",
          })}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <a href={`./content/${_id}`}>Go to change data</a>
    </form>
  );
}
