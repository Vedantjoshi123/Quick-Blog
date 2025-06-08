import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBlogs } from "../services/blogsServices";
import dayjs from "dayjs";
import { config } from "../services/config";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const term = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await searchBlogs(term);
        setResults(response.data || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (term) {
      fetchSearchResults();
    }
  }, [term]);

  return (
    <div className="container py-4 min-vh-100">
      <h3 className="mb-4 text-color">Search Results for "{term}"</h3>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No matching blogs found.</p>
      ) : (
        <div className="d-flex flex-column gap-4">
  {results.map((blog) => (
    <div
      className="card flex-column flex-md-row shadow-sm border-0 rounded-4"
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
          <a
            href={`/blog/${blog.blogId}`}
            className="btn btn-sm btn-outline-primary"
          >
            Read Full Blog
          </a>
        </div>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
}

export default SearchPage;
