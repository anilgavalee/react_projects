import { memo, useMemo, useState } from "react";

function createArchivePosts() {
  const posts = [];
  for (let i = 0; i <= 10000; i++) {
    posts.push({
      id: i,
      title: `Archived post ${i}`,
      body: "This is an archived post",
    });
  }
  return posts;
}
function Archive({ onAddPost }) {
  const [archivePosts] = useState(createArchivePosts);
  console.log("Archive rendered");
  const renderedPost = useMemo(() => {
    return archivePosts.map((post) => {
      return (
        <li key={post.id}>
          <span>{post.title}</span>
          <button onClick={() => onAddPost}>Add</button>
        </li>
      );
    });
  }, [archivePosts, onAddPost]);
  return (
    <>
      <div>
        <h2>📦 Archive</h2>
        <ul>{renderedPost}</ul>
      </div>
    </>
  );
}

export default memo(Archive);
