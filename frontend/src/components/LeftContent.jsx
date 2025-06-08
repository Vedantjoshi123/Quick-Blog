import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function LeftContent() {
  const { user } = useContext(AuthContext);

  const getLinkClass = ({ isActive }) =>
    "nav-link text-white" + (isActive ? " active" : "");

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark d-none d-md-block"
      style={{height: "100%"}}
    >

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={getLinkClass}>
            Categories
          </NavLink>
        </li>

        {user && (
          <>
            <hr />
            <li>
              <NavLink to="/add-blog" className={getLinkClass}>
                Add Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-category" className={getLinkClass}>
                Add Category
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-blogs" className={getLinkClass}>
                My Blogs
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default LeftContent;
