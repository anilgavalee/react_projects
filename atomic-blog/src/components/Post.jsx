export function Post({ post }) {
  return (
    <li>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </li>
  );
}
