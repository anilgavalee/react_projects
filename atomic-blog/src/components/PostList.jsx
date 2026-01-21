import { Post } from "./Post";

export function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post}></Post>
      ))}
    </ul>
  );
}
