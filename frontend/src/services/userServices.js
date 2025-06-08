import axios from 'axios'
import {config} from './config'

export async function insertData(uname, email, password){
    const signupUrl = `${config.serverUrl}/user/signup`
    const body = {
        uname, email, password
    }
    const result = await axios.post(signupUrl, body)
    return result.data
}

export async function checkUser(email, password){
    const signinUrl = `${config.serverUrl}/user/signin`
    const body = {  
        email, password
    }
    const result = await axios.post(signinUrl, body)
    return result.data
}


export async function getProfile() {
    const profileUrl = `${config.serverUrl}/user/profile`
    const result = await axios.get(profileUrl, {
      headers: { token: sessionStorage.getItem("token") },
    });
    return result.data
}

export async function updateProfile(uname) {
    const updateUrl = `${config.serverUrl}/user/profile`
    const body = { uname }
    const result = await axios.put(updateUrl, body, {
        headers: {
          token,  
        },
      });
    return result.data
}

