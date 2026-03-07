import { Link } from "react-router-dom";
import { useState } from "react";

function BlogList() {
  const [blogs] = useState([
    { id: 1, title: "İlk Blog", content: "Bu benim ilk blog yazım" },
    { id: 2, title: "Deneme", content: "Bu da ikinci blog yazım" }
  ]);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Bloglar</h1>

      <Link to="/add-blog">
        <button style={{
          padding: "10px 20px",
          background: "#333",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}>
          Yeni Blog Ekle
        </button>
      </Link>

      {blogs.map(b => (
        <div key={b.id} style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "15px"
        }}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
