import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/userliste')
}

/**
 * Récupération d'un utilisateur
 * @param {number} uid 
 * @returns {Promise}
 */
let getUser = (uid) => {
    return Axios.get('/userliste/'+uid)
}

/**
 * Ajout d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let addUser = (user) => {
    return Axios.put('/userliste', user)
}

/**
 * Mise à jour d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let updateUser = (user) => {
    return Axios.patch('/userliste/'+user.id, user)
}

/**
 * Suppression d'un utilsateur
 * @param {number} uid 
 * @returns {Promise}
 */
let deleteUser = (uid) => {
    return Axios.delete('/userliste/'+uid)
}

// Décaraltion des esrvices pour import
export const userService = {
    getAllUsers, getUser, addUser, updateUser, deleteUser
}