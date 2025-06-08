import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById, updateCategory } from "../services/categoryServices";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    title: "",
    description: "",
  });

  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        if (response.status === "success") {
          const data = response.data[0];
          setCategoryData({ title: data.title, description: data.description });
        } else {
          toast.error("Failed to load category.");
          navigate("/categories");
        }
      } catch (error) {
        toast.error("Error fetching category.");
        navigate("/categories");
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, description } = categoryData;

    if (!title) {
      toast.error("Category title is required.");
      return;
    }

    try {
      const response = await updateCategory(id, title, description);
      if (response.status === "success") {
        toast.success("Category updated successfully.");
        navigate("/categories");
      } else {
        toast.error("Failed to update category.");
      }
    } catch (error) {
      toast.error("An error occurred during update.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edit Category</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Category Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={categoryData.title}
          onChange={(e) => setCategoryData({ ...categoryData, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Category Description</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={categoryData.description}
          onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
        ></textarea>
      </div>

      <button className="btn btn-success" onClick={handleUpdate}>
        Update Category
      </button>
    </div>
  );
}

export default EditCategory;
