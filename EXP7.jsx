import React from "react";

function ProductCard({ name, price, status }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      margin: "10px",
      textAlign: "center",
      width: "200px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      color: "#000"
    }}>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#ffffff",
      color: "#000"
    }}>
      <h2>Products List</h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px"
      }}>
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.50" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </div>
  );
}

export default App;
