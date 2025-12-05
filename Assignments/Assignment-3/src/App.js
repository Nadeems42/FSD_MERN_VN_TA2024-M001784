
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import dataJson from "./data.json";

// ProfileCard Component
function ProfileCard({ name, role, image }) {
  return (
    <div style={{ border: "1px solid gray", padding: 10, margin: 10, display: 'inline-block' }}>
      {image && <img src={image} alt={name} width="100" />}
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// Nested Route Components
function Electronics() {
  return <h3>Electronics Section</h3>;
}
function Fashion() {
  return <h3>Fashion Section</h3>;
}

// Products Page with Nested Routes
function ProductsPage() {
  return (
    <>
      <h2>Products</h2>
      <Link to="electronics">Electronics</Link> | <Link to="fashion">Fashion</Link>

      <Routes>
        <Route path="electronics" element={<Electronics />} />
        <Route path="fashion" element={<Fashion />} />
      </Routes>
    </>
  );
}

// Pagination Component
function PaginationUsers() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch(() => setUsers([]));
  }, []);

  const pageUsers = users.slice(page * 5, page * 5 + 5);

  return (
    <div>
      <h2>Paginated Users</h2>
      {pageUsers.map((u) => (
        <p key={u.id}>{u.firstName} {u.lastName}</p>
      ))}

      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
      <button disabled={(page + 1) * 5 >= users.length} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default function App() {
  // Many States for Different Features
  const [nameLive, setNameLive] = useState("");

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [productsAPI, setProductsAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fruits, setFruits] = useState(["Apple", "Mango"]);
  const [newFruit, setNewFruit] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const students = [
    { name: "Nadeem", dept: "CSE", year: 3 },
    { name: "Ali", dept: "ECE", year: 2 },
    { name: "Rahul", dept: "IT", year: 1 }
  ];

  const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Shirt", category: "Clothes" }
  ];

  // Fetch API Products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((d) => {
        setProductsAPI(d.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Fetch Single User
  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then(setUser)
      .catch(() => setUser({}));
  }, []);

  const filteredProducts = filter === "All" ? products : products.filter((p) => p.category === filter);

  const searchedStudents = ["Nadeem", "Ali", "Rahul", "Sara"].filter((s) => s.toLowerCase().includes(search.toLowerCase()));

  const addPost = async () => {
    try {
      await axios.post("https://dummyjson.com/posts/add", {
        title: "My Post",
        body: "Demo content"
      });
      alert("Post Added!");
    } catch (err) {
      alert("Failed to add post");
    }
  };

  const updateUser = () => {
    fetch("https://dummyjson.com/users/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).catch(() => {});
  };

  // Parent showAlert and child demo
  const showAlert = () => alert("Hello from parent!");
  function Child({ onClick }) {
    return <button onClick={onClick}>Call Parent Alert</button>;
  }

  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h1>Combined React Project</h1>

        <div>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/products">Products</Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2>Students (Map into Cards)</h2>
                {students.map((s, i) => (
                  <div key={i} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
                    <h3>{s.name}</h3>
                    <p>{s.dept}</p>
                    <p>Year: {s.year}</p>
                  </div>
                ))}

                <h2>Conditional Login</h2>
                <p>{true ? "Welcome back!" : "Please log in"}</p>

                <h2>Profile Cards</h2>
                <ProfileCard name="Nadeem" role="Developer" image="" />
                <ProfileCard name="Sara" role="Designer" image="" />
                <ProfileCard name="John" role="Manager" image="" />

                <h2>Live Username</h2>
                <input onChange={(e) => setNameLive(e.target.value)} placeholder="Username" />
                <h3>You typed: {nameLive}</h3>

                <h2>Simple Form</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  <input placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  <button>Submit</button>
                </form>
                <h3>Name: {formData.name}</h3>
                <h3>Email: {formData.email}</h3>

                <h2>Filter Products</h2>
                <button onClick={() => setFilter("All")}>All</button>
                <button onClick={() => setFilter("Electronics")}>Electronics</button>
                <button onClick={() => setFilter("Clothes")}>Clothes</button>
                {filteredProducts.map((p, i) => (
                  <p key={i}>{p.name}</p>
                ))}

                <h2>Search Students</h2>
                <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                {searchedStudents.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}

                <h2>Local JSON Data</h2>
                {dataJson.map((p, i) => (
                  <div key={i} style={{ border: "1px solid black", margin: 10 }}>
                    <h3>{p.name}</h3>
                    <p>{p.price}</p>
                  </div>
                ))}

                <h2>API Products</h2>
                {loading ? <h3>Loading...</h3> : error ? <h3>Error loading data</h3> : productsAPI.map((p) => <p key={p.id}>{p.title} - {p.brand} - ₹{p.price}</p>)}

                <h2>Fruits List</h2>
                <input onChange={(e) => setNewFruit(e.target.value)} />
                <button onClick={() => { if(newFruit) { setFruits([...fruits, newFruit]); setNewFruit(''); }}}>Add</button>

                {fruits.map((f, i) => (
                  <div key={i}>
                    {f}
                    <button onClick={() => setFruits(fruits.filter((_, idx) => idx !== i))}>Delete</button>
                  </div>
                ))}

                <h2>Update Profile</h2>
                <input value={profile.name} placeholder="Name" onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                <input value={profile.email} placeholder="Email" onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                <input value={profile.phone} placeholder="Phone" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />

                <h2>Parent → Child function</h2>
                <Child onClick={showAlert} />

                <h2>Post API</h2>
                <button onClick={addPost}>Add Post</button>

                <h2>Edit User (PUT)</h2>
                <input value={user.firstName || ""} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                <button onClick={updateUser}>Update User</button>

                <PaginationUsers />
              </>
            }
          />

          <Route path="/about" element={<h2>About Page</h2>} />
          <Route path="/products/*" element={<ProductsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
