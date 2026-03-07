import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Hoşgeldin 👋</h1>
      <p>Buradan kullanıcı bloglarına ulaşabilirsin.</p>

      <Link to="/blogs">
        <button style={{
          padding: "10px 20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Blogları Gör
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
