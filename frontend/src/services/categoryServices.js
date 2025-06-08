import axios from 'axios'
import {config} from './config'

export async function insertCategory(title, description){
    const addCatUrl = `${config.serverUrl}/category/add-category`
    const body = {
        title, description
    }
    const result = await axios.post(addCatUrl, body)
    return result.data
}

export async function getAllCategories(){
    const getAllCategoriesUrl = `${config.serverUrl}/category/`
    const result = await axios.get(getAllCategoriesUrl)
    return result.data  
}


export async function getCategoryById(id){
    const getCategoryUrl = `${config.serverUrl}/category/${id}`
    const result = await axios.get(getCategoryUrl)
    return result.data
}

export async function updateCategory(id, title, description){
    const updateCategoryUrl = `${config.serverUrl}/category/edit-category/${id}`
    const body ={
        title, description
    }
    const result = await axios.put(updateCategoryUrl, body)
    return result.data
}

export async function deleteCategory(id){
    const deleteCategoryUrl = `${config.serverUrl}/category/delete-category/${id}`
    const result = await axios.delete(deleteCategoryUrl)
    return result.data
}
