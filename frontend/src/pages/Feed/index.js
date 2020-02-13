import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles.css";

import api from "../../services/api";

import more from "../../assets/more.svg";
import like from "../../assets/like.svg";
import comment from "../../assets/comment.svg";
import send from "../../assets/send.svg";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const response = await api.get("/posts");

    setPosts(response.data);
  }

  useEffect(() => {
    registerToSocket();
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function registerToSocket() {
    const socket = io("http://localhost:3333");

    socket.on("post", newPost => {
      setPosts(prev => [newPost, ...prev]);
    });

    socket.on("like", likedPost => {
      setPosts(prev =>
        prev.map(post => (post._id === likedPost._id ? likedPost : post))
      );
    });
  }

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }
  return (
    <section id="post-list">
      {posts.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.location}</span>
            </div>

            <img src={more} alt="Mais" />
          </header>

          <img src={`http://localhost:3333/files/${post.image}`} alt="" />

          <footer>
            <div className="actions">
              <button onClick={() => handleLike(post._id)}>
                <img src={like} alt="" />
              </button>
              <img src={comment} alt="" />
              <img src={send} alt="" />
            </div>

            <strong>{post.likes} curtidas</strong>

            <p>
              {post.description}

              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}
