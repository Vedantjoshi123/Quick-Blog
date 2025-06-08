import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { insertData } from "../services/userServices";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { uname, email, password, confirmPassword } = formData;

    if (!uname || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character"
      );
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const response = await insertData(uname, email, password);
      if (response.status === "success") {
        toast.success("Registration done successfully!");
        navigate("/login");
      } else {
        toast.error("Unable to register");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "90vh", backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "500px",
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={formData.uname}
              onChange={(e) =>
                setFormData({ ...formData, uname: e.target.value })
              }
              required
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
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

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={{
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                  backgroundColor: "transparent",
                  color: "var(--color-primary)",
                }}
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn sub-btn w-100"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
