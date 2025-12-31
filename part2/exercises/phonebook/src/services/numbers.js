import axios from "axios";

const BASE_URL = '/api/persons';

const getAll = () => {
    const response = axios.get(BASE_URL)
    return response.then(response => response.data);
}

const create = newObject => {
    const response = axios.post(BASE_URL, newObject)
    return response.then(response => response.data);
}

const updatePerson = personObject => {
    const updateURL = `${BASE_URL}/${personObject.id}`
    const response = axios.put(updateURL, personObject)
    return response.then(response => response.data);
}

const deletePerson = personId => {
    const deleteURL = `${BASE_URL}/${personId}`
    const response = axios.delete(deleteURL);
    return response.then(response => response.data);
}

export default {
    getAll,
    create,
    updatePerson,
    deletePerson
}