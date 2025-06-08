import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory, getAllCategories } from "../services/categoryServices";
import { AuthContext } from "../context/AuthProvider";

function Categories() {
  const [categories, setCategories] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.status === "success") {
        setCategories(response.data);
      } else {
        toast.error("Failed to load categories.");
      }
    } catch (error) {
      console.log("Error fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id);
      if (res.status === "success") {
        toast.success("Category deleted successfully.");
        fetchCategories();
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      toast.error("Error deleting category.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-category/${id}`);
  };

  const handleAddCategory = () => {
    navigate("/add-category");
  };

  return (
    <div className="container min-vh-100 my-5 px-2 px-sm-3 px-md-4 px-lg-5 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 text-color">All Categories</h2>
        <button className="btn sub-btn rounded-pill" onClick={handleAddCategory}>
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="row g-4">
          {categories.map((cat) => (
            <div className="col-md-6 col-lg-4" key={cat.id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{cat.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{cat.description}</p>
                  { user &&
                    <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-warning btn-sm rounded-pill"
                      onClick={() => handleEdit(cat.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
