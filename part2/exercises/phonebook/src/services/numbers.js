import axios from "axios";

const BASE_URL = 'http://localhost:3001/persons';


const getAll = () => {
    const response = axios.get(BASE_URL)
    return response.then(response => response.data)
}

const create = newObject => {
    const response = axios.post(BASE_URL, newObject)
    return response.then(response => response.data)
}

export default {
    getAll,
    create,
}