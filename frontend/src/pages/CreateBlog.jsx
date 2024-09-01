import { useState } from "react";
import { createPost } from "../api";
export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };
    await createPost(submitObject);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Blog Post Title:</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        name="title"
      />
      <label>Blog Description:</label>

      <input
        onChange={(e) => setDescription(e.target.value)}
        maxLenght={200}
        required
        name="description"
      />
      <label>Blog Content:</label>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        maxLenght={5000}
        required
        name="content"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
