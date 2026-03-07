import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import BlogList from "./BlogList";
import AddBlog from "./AddBlog";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Ana Sayfa</Link>
        <Link to="/blogs" style={{ marginRight: "15px" }}>Blogları Gör</Link>
        <Link to="/add-blog">Blog Ekle</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
