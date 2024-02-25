import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useState } from "react";
import axios from "axios";
import { url } from "../../utils";

export default function EditSecond(id: { id: number }) {
  const _id = id.id;
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.target);
    form.set("content", form.get("content"));
    try {
      const token = sessionStorage.getItem("token");
      await axios.putForm(`http://localhost:3333/edit-blog-file/${_id}`, form, {
        headers: { authorization: `Bearer ${token}` },
      });
      window.location = `${url}/admin/edit`;
    } catch (err) {
      setMessage("A field is not entered correctly");
      console.error(err);
    }
  }

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
        <p className={styleLabel}>Content</p>
        <input
          placeholder="Select your file"
          type="file"
          name="content"
          required
        />
      </div>
      <p className={css({ color: "red.300" })}>{message}</p>
      <button type="submit">Confirm</button>
    </form>
  );
}
