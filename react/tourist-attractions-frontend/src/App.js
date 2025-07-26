import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [attractions, setAttractions] = useState([]);

  const [form, setForm] = useState({
    name: "",
    country: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = () => {
    axios
      .get("http://localhost:5000/api/attractions")
      .then((res) => setAttractions(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.country) {
      alert("Name and Country are required!");
      return;
    }

    axios
      .post("http://localhost:5000/api/attractions", form)
      .then(() => {
        alert("Attraction added!");
        setForm({
          name: "",
          country: "",
          category: "",
          description: "",
          imageUrl: "",
        });
        fetchAttractions();
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding attraction");
      });
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <h1 className="mb-4 text-primary text-center">Tourist Attractions</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-5 shadow p-4 rounded bg-light"
      >
        <h3 className="mb-3 text-secondary">Add New Attraction</h3>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="country"
            placeholder="Country *"
            value={form.country}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Attraction
        </button>
      </form>

      {/* List */}
      {attractions.length === 0 ? (
        <p className="text-center text-muted">No attractions found.</p>
      ) : (
        <ul className="list-group">
          {attractions.map((attraction) => (
            <li
              key={attraction.id}
              className="list-group-item mb-3 rounded shadow-sm"
            >
              <h5 className="text-primary">{attraction.name}</h5>
              <p>
                <strong>Country:</strong> {attraction.country}
              </p>
              {attraction.category && (
                <p>
                  <strong>Category:</strong> {attraction.category}
                </p>
              )}
              {attraction.description && <p>{attraction.description}</p>}
              {attraction.imageUrl && (
                <img
                  src={attraction.imageUrl}
                  alt={attraction.name}
                  className="img-fluid rounded"
                  style={{ maxWidth: "300px" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
