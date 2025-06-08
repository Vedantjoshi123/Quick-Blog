import React from 'react'
import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";

function MyFooter() {
  return (
    <footer className="d-flex flex-wrap py-5 justify-content-evenly align-items-center my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
      </a>
      <span className="mb-3 mb-md-0 text-muted">QuickBlog  | Created By <a href="mailto:vedantjoshi4406@gmail.com">Vedant Joshi</a> © 2025  </span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a href="https://www.linkedin.com/in/joshivedant/"><FaLinkedin /></a></li>
      <li className="ms-3"><a href="https://github.com/Vedantjoshi123"><FaGithub /></a></li>
      <li className="ms-3"><a href="https://joshivedant.netlify.app/"><FaLink /></a></li>
    </ul>
  </footer>
    
  )
}

export default MyFooter