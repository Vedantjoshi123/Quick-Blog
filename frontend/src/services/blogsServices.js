import axios from 'axios'
import {config} from './config'

// export async function insertBlogData(uname, email, password){
//     const signupUrl = `${config.serverUrl}/add/`
//     const body = {
//         uname, email, password
//     }
//     const result = await axios.post(signupUrl, body)
//     return result.data
// }

export const searchBlogs = async (term) =>{
  try {
    console.log(term);
    
    const response = await axios.get(`${config.serverUrl}/blog/search?q=${term}`);  
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { status: "error", data: error.response?.data || error.message };
  }
}
export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${config.serverUrl}/blog/${blogId}`);
   return response.data;
  } catch (error) {
    return { status: "error", data: error.response?.data || error.message };
  }
};

export async function postBlogData(title, content, categoryId, image) {
    try {
      const insertBlogDataUrl = `${config.serverUrl}/blog/addblog`
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("content", content);
      blogData.append("categoryId", categoryId);
      blogData.append("image", image);
      const token = sessionStorage.getItem("token")
      const response = await axios.post(insertBlogDataUrl, blogData, {
        headers: {
          token,  
        },
      });
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('exception: ', ex)
    }
}

export async function getAllBlogs(){
    try {
      const allBlogsUrl = `${config.serverUrl}/blog/`
      const result = await axios.get(allBlogsUrl)
      return result.data
    } catch (error) {
      return { status: "error", message: "Failed to fetch All blogs." };
    }
}

export const getBlogsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${config.serverUrl}/blog/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return { status: "error", message: "Failed to fetch category blogs." };
    }
  };
  

  export const getMyBlogs = async () => {
    try {
      const response = await axios.get(`${config.serverUrl}/blog/myblogs`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      
      console.log(response)
      return { status: "error", message: "Failed to fetch My blogs." };
    }
  };
  
  export const deleteBlogById = async (id) => {
    try {
      const response = await axios.delete(`${config.serverUrl}/blog/delete/${id}`, {
        headers: { token: sessionStorage.getItem("token") },
      });
      return response.data;
    } catch (error) {
      return { status: "error", message: "Failed to Delete category blogs." };
    }
  };

  export const updateBlog = async (id, formData) => {
    try {
      const response = await axios.put(`${config.serverUrl}/blog/update/${id}`,
        formData,
        {
          headers: {
            token: sessionStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
      return response.data;
    } catch (error) {
      return { status: "error", message: "Failed to Update blog." };
    }
  }