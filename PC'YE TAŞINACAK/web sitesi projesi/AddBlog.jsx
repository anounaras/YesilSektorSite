import { useState } from "react";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      title,
      content
    };

    console.log("Yeni blog eklendi:", newBlog);

    setTitle("");
    setContent("");

    alert("Blog başarıyla eklendi!");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Yeni Blog Ekle</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            width: "300px",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <textarea
          placeholder="Blog içeriği..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            display: "block",
            width: "300px",
            height: "120px",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button type="submit" style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
