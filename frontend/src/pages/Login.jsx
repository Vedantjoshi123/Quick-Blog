import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { checkUser } from "../services/userServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address");
    } else if (!password) {
      toast.error("Password is required");
    } else {
      const response = await checkUser(email, password);
      if (response.status === "success") {
        const { token, userName, userEmail } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", userName);
        setUser({ userName, userEmail });
        toast.success("Logged in successfully!");
        navigate("/");
      } else {
        toast.error("Failed to Login");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{
            fontFamily: "var(--font-family-base)",
            color: "var(--color-primary)",
          }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  backgroundColor: "transparent",
                  color: "var(--color-primary)",
                }}
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn sub-btn w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/register" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
