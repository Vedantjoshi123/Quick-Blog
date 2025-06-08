import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAllBlogs, getBlogsByCategory } from "../services/blogsServices";
import { getAllCategories } from "../services/categoryServices";
import { config } from "../services/config";
import { FaArrowRightLong } from "react-icons/fa6";

dayjs.extend(relativeTime);

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchAllBlogs = async () => {
    try {
      const response = await getAllBlogs();
      if (response.status === "success") {
        let data = sortBlogs(response.data, sortOrder);
        setBlogs(data);
        setActiveCategory(null);
      } else {
        toast.error("Failed to fetch blogs.");
      }
    } catch (error) {
      toast.error("Error fetching blogs.");
    }
  };

  const fetchBlogsByCategory = async (categoryId) => {
    try {
      const response = await getBlogsByCategory(categoryId);
      if (response.status === "success") {
        let data = sortBlogs(response.data, sortOrder);
        setBlogs(data);
        setActiveCategory(categoryId);
      } else {
        toast.error("No blogs found for this category.");
      }
    } catch (error) {
      toast.error("Error fetching blogs by category.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.status === "success") {
        setCategories(response.data);
      } else {
        toast.error("Failed to fetch categories.");
      }
    } catch (error) {
      toast.error("Error fetching categories.");
    }
  };

  const sortBlogs = (blogs, order) => {
    const sorted = [...blogs];
    switch (order) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return blogs;
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);
    const sorted = sortBlogs(blogs, value);
    setBlogs(sorted);
  };

  useEffect(() => {
    fetchAllBlogs();
    fetchCategories();
  }, []);

  return (
    <div className="container px-2 px-sm-3 px-md-4 px-lg-5 py-4 min-vh-100">
      <h2 className="mb-4 text-center text-color">Blogs</h2>
      <div className="row">
        <div className="col-12 col-lg-8">
          {blogs.length === 0 ? (
            <p className="text-center">No blogs found.</p>
          ) : (
            <div className="d-flex flex-column gap-4 ">
              {blogs.map((blog) => (
                <div
                  className="card flex-column flex-md-row shadow-sm border-0 rounded-4"
                  style={{ backgroundColor: "#f4f3f3c4" }}
                  key={blog.blogId}
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
                      <div className="text-secondary mb-2">
                        <small>
                          By <strong>{blog.authorName}</strong>
                        </small>
                        <br />
                        <small>Posted {dayjs(blog.createdAt).fromNow()}</small>
                      </div>
                      <Link
                        to={`/blog/${blog.blogId}`}
                        className="btn btn-sm read-more border-info-subtle"
                      >
                        Read Full Blog
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4 mt-4">
          <div className="sticky-top" style={{ top: "10%" }}>
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body">
                <h3
                  className="fw-bold mb-3 text-color"
                  style={{ color: "var(--color-primary)" }}
                >
                  Categories
                </h3>
                <ul className="list-unstyled">
                  <li>
                    <button
                      className="btn w-100 text-start mb-2"
                      style={{
                        backgroundColor:
                          activeCategory === null
                            ? "var(--color-primary)"
                            : "transparent",
                        color:
                          activeCategory === null
                            ? "var(--button-text)"
                            : "var(--color-text)",
                        fontFamily: "var(--font-family-base)",
                        border: "1px solid var(--color-primary)",
                      }}
                      onClick={fetchAllBlogs}
                    >
                      All
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className="btn w-100 text-start mb-2"
                        style={{
                          backgroundColor:
                            activeCategory === category.id
                              ? "var(--color-primary)"
                              : "transparent",
                          color:
                            activeCategory === category.id
                              ? "var(--button-text)"
                              : "var(--color-text)",
                          fontFamily: "var(--font-family-base)",
                          border: "1px solid var(--color-primary)",
                        }}
                        onClick={() => fetchBlogsByCategory(category.id)}
                      >
                        {category.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="card border-0 shadow-sm rounded-4"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--color-text)",
              }}
            >
              <div className="card-body">
                <h4
                  className="fw-bold mb-3"
                  style={{ color: "var(--color-primary)" }}
                >
                  Sort By
                </h4>
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={handleSortChange}
                  style={{
                    backgroundColor: "var(--input-bg)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-primary)",
                    fontFamily: "var(--font-family-base)",
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="az">A-Z (Title)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
