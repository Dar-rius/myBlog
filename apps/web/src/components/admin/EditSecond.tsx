import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import axios from "axios";

export default function EditSecond() {
  let content = useRef("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        content: content.current,
      };
      console.log(data);
      const token = sessionStorage.getItem("token");
      await axios.post(`http://localhost:3333/json`, data, {
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (err) {
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
    <form onSubmit={handleSubmit}>
      <div className={styleContainer}>
        <p className={styleLabel}>Content</p>
        <input
          placeholder="Select your file"
          type="file"
          name="content"
          onChange={(e) => (content.current = e.target.value)}
        />
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
}
