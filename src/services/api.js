import axios from 'axios'

export const api_admin = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'http://casdplus.herokuapp.com/admin/',
})

export const api_student = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'http://casdplus.herokuapp.com/student/',
})

// export default api;