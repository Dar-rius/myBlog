import { css } from "../../../styled-system/css";
import { flex } from "../../../styled-system/patterns";
import React, { useRef } from "react";
import { request, response } from "undici";

export default function ContentComponent() {
  let content = useRef("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const data = {
        content: content.current,
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
          placeholder="Enter your title of blog"
          type="file"
          name="content"
          onChange={(e) => (content.current = e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
