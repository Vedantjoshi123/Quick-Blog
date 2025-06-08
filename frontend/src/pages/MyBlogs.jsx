import React, { useEffect, useState } from "react";
import { getMyBlogs, deleteBlogById } from "../services/blogsServices";
import { config } from "../services/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const response = await getMyBlogs();
      if (response.status === "success") {
        setBlogs(response.data);
        console.log(response.data);
      } else {
        toast.error("Failed to fetch your blogs.");
      }
    } catch (error) {
      toast.error("Error fetching your blogs.");
    }
  };

  const handleDelete = async (blogId) => {
      try {
        const response = await deleteBlogById(blogId);
        console.log(response);

        if (response.status === "success") {
          toast.success("Blog deleted successfully.");
          fetchMyBlogs(); // Refresh
        } else {
          toast.error("Failed to delete blog.");
        }
      } catch (error) {
        toast.error("Error deleting blog.");
      }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div className="container px-2 px-sm-3 px-md-4 px-lg-5 py-4 min-vh-100">
      <h2 className="mb-4 text-center text-color">My Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-center">You haven't posted any blogs yet.</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {blogs.map((blog, index) => (
          <div
          className="card shadow-sm border-0 rounded-4 flex-column flex-md-row mb-4"
          key={index}
        >
          {blog.image && (
            <img
              src={`${config.serverUrl}/images/${blog.image}`}
              className="img-fluid rounded-top rounded-md-start"
              alt={blog.title}
              style={{
                width: "100%",
                maxWidth: "250px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}
        
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title fw-bold">{blog.title}</h5>
              <p
                className="card-text text-muted"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  whiteSpace: "normal",
                }}
              >
                {blog.content}
              </p>
            </div>
        
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <small className="text-secondary mb-2">
                Posted {dayjs(blog.createdAt).fromNow()}
              </small>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/edit-blog/${blog.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
