import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { RiMenu2Fill, RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";


function MyHeader() {
  const { user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    toast.success("Log-out Successfully")
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
      setSearchTerm("");
    }
  };

  const getLinkClass = ({ isActive }) =>
    "nav-link px-2" + (isActive ? " active text-primary fw-bold" : " text-white");

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-secondary px-3 py-2 shadow-sm">
  <NavLink to="/" className="navbar-brand">
    <span className="text-white">Quick</span>Blog
  </NavLink>

  <button
    className="navbar-toggler border-0 shadow-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#mobileNav"
    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  >
  <span className="text-accent fs-3 transition-all">
      {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu2Fill />}
    </span>
  </button>

   <div className="collapse navbar-collapse justify-content-end" id="mobileNav">
        {/* Mobile Nav Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-md-none">
          <li className="nav-item">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categories" className={getLinkClass}>
              Categories
            </NavLink>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <NavLink to="/add-blog" className={getLinkClass}>
                  Add Blog
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/add-category" className={getLinkClass}>
                  Add Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/my-blogs" className={getLinkClass}>
                  My Blogs
                </NavLink>
              </li>
            </>
          )}
        </ul>

    {/* Middle: Search bar - flex-grow and centered */}
    <form
      className="d-flex ms-auto flex-grow-1"
      style={{ maxWidth: "500px" }}
      onSubmit={handleSearch}
    >
      <input
        className="form-control form-control-sm me-2"
        type="search"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-sm btn-outline-light" type="submit">
        Search
      </button>
    </form>

    {/* Right: Auth Buttons / Dropdown */}
    <ul className="navbar-nav ms-auto">
      {!user ? (
        <>
          <li className="nav-item">
            <NavLink to="/login" className={getLinkClass}>
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className={getLinkClass}>
              Sign Up
            </NavLink>
          </li>
        </>
      ) : (
        <li className="nav-item dropdown">
          <a
                className="nav-link text-white d-flex align-items-center"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen}
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                {user.userName}
                <span className="ms-1">
                  {isDropdownOpen ? <FaCaretUp /> : <FaCaretDown className="mt-1 tra"/>}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end mt-1" aria-labelledby="userDropdown">
                <li>
                  <span className="dropdown-item" role="button" onClick={handleLogout}>
                    Sign Out
                  </span>
                </li>
              </ul>
        </li>
      )}
    </ul>
  </div>
</nav>

  );
}

export default MyHeader;
