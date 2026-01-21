import { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import { Search } from "./components/Search";
import { PostList } from "./components/PostList";
import  Archive  from "./components/Archive";
function App() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleAddPost = useCallback((newPost) => {
    setPosts((pre) => [...pre, newPost]);
  }, []);
  const filteredPosts = searchQuery
    ? posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];
  return (
    <div>
      <h1>Atomic blog</h1>
      <Search searchQuery={searchQuery} onSearch={setSearchQuery}></Search>
      {searchQuery && <PostList posts={filteredPosts}></PostList>}
      <hr></hr>
      {/* {posts && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </li>
            );
          })}
        </ul>
      )} */}
      <Form onAddPost={handleAddPost}></Form>
      <hr></hr>
      <Archive onAddPost={handleAddPost} />
    </div>
  );
}

export default App;
