import React, { useState } from "react";
import api from "../../services/api";

import "./styles.css";

export default function New({ history }) {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("location", location);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("/posts", data);

    history.push("/");
  }

  return (
    <form id="new-post" onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />

      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />

      <input
        type="text"
        name="location"
        placeholder="Localidade"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />

      <input
        type="text"
        name="description"
        placeholder="Texto do post"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags"
        value={hashtags}
        onChange={e => setHashtags(e.target.value)}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
