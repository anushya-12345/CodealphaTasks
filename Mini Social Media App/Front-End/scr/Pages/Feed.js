import React, { useEffect, useState } from "react";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleCreate = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId: "demoUserId" }) // replace with logged-in user
    });
    setText("");
  };

  return (
    <div>
      <h2>Feed</h2>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleCreate}>Post</button>
      {posts.map(p => (
        <div key={p._id}>
          <p>{p.text} — by {p.author?.name}</p>
          <p>Likes: {p.likes.length}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;
