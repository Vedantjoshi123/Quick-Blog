import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBlogById } from "../services/blogsServices";
import { config } from "../services/config";

function BlogPage() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        if (response.status === "success") {
          setBlog(response.data[0]);
        } else {
          toast.error("Blog not found.");
        }
      } catch (error) {
        toast.error("Error fetching blog details.");
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#fefefe",
        fontFamily: "'Lora', serif",
        color: "#2d2d2d",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: "80%" }}>
        <button
          onClick={() => navigate("/")}
          className="btn read-more mb-4"
          style={{
                          border: "1px solid var(--color-primary)",
                          color: "var(--color-text)"
                        }}
        >
          ⬅ Back to Home
        </button>

        {blog ? (
          <div className="card shadow-sm p-4 border-0" style={{ background: "#ffffff" }}>
            <img
              src={`${config.serverUrl}/images/${blog.image}`}
              className="img-fluid rounded mb-4"
              alt={blog.title}
              style={{
                maxHeight: "450px",
                objectFit: "cover",
                width: "100%",
                borderRadius: "16px",
              }}
            />

            <h1 className="text-color fw-bold mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              {blog.title}
            </h1>

            <div
              className="fs-5"
              style={{
                lineHeight: "2",
                textAlign: "justify",
                wordSpacing: "normal",
              }}
            >
              {blog.content}
            </div>

            <hr className="my-5" />
            <div className="mt-5 text-end">
              <h5 className="text-secondary">Author Information</h5>
              <p className="mb-1 fw-bold">{blog.authorName}</p>
              <p className="mb-1">
                Email:{" "}
                <a
                  href={`mailto:${blog.authorEmail}`}
                  className="text-decoration-none"
                >
                  {blog.authorEmail}
                </a>
              </p>
              <p className="text-muted">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <a
                href={`mailto:${blog.authorEmail}`}
                className="btn btn-outline-success mt-2"
              >
                📩 Contact Author
              </a>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default BlogPage;
