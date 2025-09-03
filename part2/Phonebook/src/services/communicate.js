import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return (
    axios
        .get(baseUrl)
        .then(
            response => {
                return response.data
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    )
}

const create = (newObject) => {
    return (
    axios
        .post(baseUrl, newObject)
        .then(
            response => {
                return response.data
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    )
}

const update = (id, newObject) => {
    return (
    axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(
            response => {
                return response.data
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        )
    )
}

const remove = (id) => {
    return (
        axios
            .delete(`${baseUrl}/${id}`)
            .then(response => {
                console.log(response.data)
                return response.data
            })
    )
}

export default {getAll, create, update, remove}