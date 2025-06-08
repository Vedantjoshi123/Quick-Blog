import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBlogById, updateBlog } from '../services/blogsServices';
import { getAllCategories } from '../services/categoryServices';
import { config } from "../services/config";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    categoryId: '',
    image: null,       
    imagePreview: '',  
  });

  const [isContentValid, setIsContentValid] = useState(true);
  const maxWordCount = 1000;
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    onGetAllCategories();
    fetchBlog();
  }, [id]);

  const onGetAllCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.status === "success") {
        setCategories(response.data);
      } else {
        toast.error("Failed to load categories.");
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await getBlogById(id);
      if (response.status === "success") {
        const data = response.data[0];
        setBlogData({
          title: data.title,
          content: data.content,
          categoryId: data.categoryId,
          image: null,
          imagePreview: data.image,
        });
        setWordCount(data.content.trim().split(/\s+/).length);
      } else {
        toast.error("Failed to load blog.");
        navigate('/');
      }
    } catch (error) {
      toast.error("Error fetching blog.");
      navigate('/');
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    const words = newContent.trim().split(/\s+/);
    setBlogData({ ...blogData, content: newContent });
    setWordCount(words.length);
    setIsContentValid(words.length <= maxWordCount);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, content, categoryId, image } = blogData;

    if (!title || !content || !categoryId) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("categoryId", categoryId);
      if (image) formData.append("image", image);

      const response = await updateBlog(id, formData);
      console.log(response)
      if (response.status === "success") {
        toast.success("Blog updated successfully.");
        navigate("/my-blogs");
      } else {
        toast.error("Failed to update Blog.");
      }
    } catch (error) {
      toast.error("An error occurred during update.");
    }
  };

  return (
    <div className="container min-vh-100 my-5 p-5">
      <h2 className="mb-4 text-color">Update the Blog</h2>

      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Blog Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={blogData.title}
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="6"
            value={blogData.content}
            onChange={handleContentChange}
          ></textarea>
          <small className={`text-${isContentValid ? "muted" : "danger"}`}>
            {wordCount}/{maxWordCount} words
          </small>
          {!isContentValid && (
            <div className="text-danger mt-2">
              <small>Word limit exceeded!</small>
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="categoryId"
            className="form-select"
            value={blogData.categoryId || ''}
            onChange={(e) => setBlogData({ ...blogData, categoryId: e.target.value })}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Current Image</label><br />
          {blogData.imagePreview && (
            <img
              src={`${config.serverUrl}/images/${blogData.imagePreview}`}
              alt="Current blog"
              style={{ width: "300px", borderRadius: "10px" }}
            />
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Upload New Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="form-control"
            onChange={(e) => setBlogData({ ...blogData, image: e.target.files[0] })}
          />
        </div>

        <div className="d-flex gap-3">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isContentValid || wordCount === 0}
          >
            Update Blog
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/my-blogs")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
