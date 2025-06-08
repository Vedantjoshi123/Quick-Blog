import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategories, insertCategory } from "../services/categoryServices";

function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.status == "success") {
        setAllCategories(response.data.map((cat) => cat.title.toLowerCase()));
      }
    } catch (error) {
      console.log("Error fetching categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = categoryData;
    if (!title.trim()) {
      toast.error("Category title is required.");
    }
    else if (allCategories.includes(title.trim().toLowerCase())) {
      toast.error("Category already exists.");
      return;
    }
    else {
      try {
        const response = await insertCategory(title, description);
        console.log(response);
        if (response.status === "success") {
          toast.success("Category added successfully");
          navigate("/categories");
        } else {
          toast.error("Failed to add category");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container my-5 p-5 min-vh-100">
      <h2 className="mb-4 text-color">Add New Category</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Category Title
        </label>
        <input
          list="category-titles"
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Enter category title"
          value={categoryData.title}
          onChange={(e) =>
            setCategoryData({ ...categoryData, title: e.target.value })
          }
          required
        />
        <datalist id="category-titles">
          {allCategories.map((title, index) => (
            <option key={index} value={title} />
          ))}
        </datalist>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Category Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          placeholder="Enter category description"
          value={categoryData.description}
          onChange={(e) =>
            setCategoryData({ ...categoryData, description: e.target.value })
          }
          rows="3"
        ></textarea>
      </div>

      <button type="submit" onClick={handleSubmit} className="btn sub-btn">
        Add Category
      </button>
    </div>
  );
}

export default AddCategory;
