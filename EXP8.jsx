import { useState } from "react";

export default function App() {
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addBook = () => {
    if (title && author) {
      setBooks([...books, { title, author }]);
      setTitle("");
      setAuthor("");
    }
  };

  const removeBook = (i) => setBooks(books.filter((_, index) => index !== i));

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: 600, width: "90%", textAlign: "center" }}>
        <h1>Library Management</h1>

        <input
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: 10 }}
          />
          <input
            placeholder="Book author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ flex: 1, padding: 10 }}
          />
          <button onClick={addBook} style={{ padding: "10px 15px" }}>
            Add
          </button>
        </div>

        {filtered.map((b, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>{b.title}</strong> by {b.author}
            </p>
            <button onClick={() => removeBook(i)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
