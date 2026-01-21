import { useState, memo } from "react";

function Form({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !body) return;
    const newPost = { id: Date.now().toString(), title, body };
    onAddPost(newPost);
    setTitle("");
    setBody("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Body</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default memo(Form);
// export default Form;
