import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: "700" }}>404</h1>
      <h2 style={{ fontFamily: "var(--font-family-base)" }}>Page Not Found</h2>
      <p className="mb-4" style={{ maxWidth: "400px", fontSize: "1.2rem" }}>
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        className="btn sub-btn text-black"
        style={{ fontFamily: "var(--font-family-base)"}}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
