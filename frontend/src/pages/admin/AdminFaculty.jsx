import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import "./AdminFaculty.css";

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    department: "",
    email: "",
    bio: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/api/faculty");
      setFaculty(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFaculty = async () => {
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/api/faculty", form);
      setForm({ name: "", title: "", department: "", email: "", bio: "", image: "" });
      fetchFaculty();
    } catch (err) {
      alert(err.response?.data?.message || "Could not add faculty");
    } finally {
      setLoading(false);
    }
  };

  const deleteFaculty = async (id) => {
    if (!window.confirm("Remove this faculty member?")) return;
    try {
      await api.delete(`/api/faculty/${id}`);
      fetchFaculty();
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete faculty");
    }
  };

  return (
    <div className="admin-faculty-wrapper">
      <AdminSidebar />

      <div className="admin-faculty-content">
        <h1 className="admin-faculty-title">Manage Faculty</h1>

        <div className="admin-faculty-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
          <button className="admin-faculty-add-btn" onClick={addFaculty} disabled={loading}>
            {loading ? "Saving..." : "Add Faculty"}
          </button>
        </div>

        <h2 className="admin-faculty-subtitle">Faculty Members</h2>

        <div className="admin-faculty-grid">
          {faculty.map((member) => (
            <div className="admin-faculty-card" key={member._id}>
              <div className="admin-faculty-card-top">
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.title || "Faculty"}</p>
                  <p>{member.department}</p>
                  <p>{member.email}</p>
                </div>
                <button className="admin-faculty-delete" onClick={() => deleteFaculty(member._id)}>
                  Delete
                </button>
              </div>
              <p className="admin-faculty-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
