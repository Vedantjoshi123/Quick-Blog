import { Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import LeftContent from "./components/LeftContent";
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import ProtectedRoute from "./components/ProtectedRoute";

import BlogPage from "./pages/BlogPage";
import EditBlog from "./pages/EditBlog";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import AddBlogs from "./pages/AddBlogs";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import SearchPage from "./pages/SearchPage";

import MyBlogs from "./pages/MyBlogs";
import { ToastContainer } from "react-toastify";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("userName");

    if (token && userName) {
      setUser({ userName });
    }
  }, []);


  return (
<>
  <AuthContext.Provider value={{ user, setUser }}>
    <div className="app-layout d-flex flex-column" style={{ minHeight: "100vh" }}>
      <MyHeader /> 

      <div className="main-content d-flex flex-grow-1">
        <div
          className="left-sidebar d-none d-md-block border-end"
          style={{ minWidth: "16%", overflowY: "auto" }}
        >
          <LeftContent />
        </div>

        <div
          className="content-area"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/blog/:blogId" element={<BlogPage />} />
            <Route path="/search" element={<SearchPage />} />


            <Route element={<ProtectedRoute />}>
              <Route path="/add-blog" element={<AddBlogs />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        <MyFooter /> 
        </div>
        
      </div>

      
    </div>
  </AuthContext.Provider>

  <ToastContainer />
</>


  );
}

export default App;
