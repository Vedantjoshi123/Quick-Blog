import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategories } from "../services/categoryServices";
import { postBlogData } from "../services/blogsServices";

function AddBlog() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    image: null,
  });
  const [wordCount, setWordCount] = useState(0);
  const [isContentValid, setIsContentValid] = useState(true);
  const maxWordCount = 1000; 
  

  const onGetAllCategories = async () => {
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

  
  const handleContentChange = (e) => {
    const newContent = e.target.value;
    const wordArray = newContent.trim().split(/\s+/);
    const newWordCount = wordArray.length;

    setFormData({ ...formData, content: newContent });
    setWordCount(newWordCount);

    
    if (newWordCount <= maxWordCount) {
      setIsContentValid(true);
    } else {
      setIsContentValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, content, categoryId, image } = formData;

    if (!title || !content || !categoryId || !image) {
      toast.warning("Please fill out all fields");
    } else if (wordCount > maxWordCount) {
      toast.warning(`Content exceeds the maximum word count of ${maxWordCount}`);
    } else {
      try {
        const response = await postBlogData(title, content, categoryId, image);
        if (response.status === "success") {
          toast.success("Blog added successfully!");
          navigate("/");
        } else {
          toast.error(response.data.message || "Failed to add blog.");
        }
      } catch (error) {
        toast.error("Error adding blog");
      }
    }
  };

  useEffect(() => {
    onGetAllCategories();
  }, []);

  return (
    <div className="container min-vh-100 my-5 p-5 px-3 px-sm-3 px-md-4 px-lg-5 py-4">
      <h2 className="mb-4 text-color">Add New Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="5"
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog content"
            required
          ></textarea>
          <small className={`text-${isContentValid ? "muted" : "danger"}`}>
            {wordCount}/{maxWordCount} words
          </small>
          {!isContentValid && (
            <div className="text-danger mt-2">
              <small>Word limit exceeded! Please shorten your content.</small>
            </div>
          )}
        </div>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div className="w-75">
            <label className="form-label">Category</label>
            <select
              name="categoryId"
              className="form-select"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => navigate("/add-category")}
            className="btn sub-btn ms-3 mt-4"
          >
            Add New Category
          </button>
        </div>

        <div className="mb-4">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            required
          />
        </div>

        <button
          type="submit"
          className="btn sub-btn"
          disabled={!isContentValid || wordCount === 0}
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
  

