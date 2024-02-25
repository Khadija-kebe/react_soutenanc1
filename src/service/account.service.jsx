import Axios from './caller.service'
import { jwtDecode } from 'jwt-decode';


/**
 * Connexion vers l'API
 * @param {object} credentials 
 * @returns {Promise}
 */
let login = (credentials) => {
    return Axios.post('/login', credentials)
}

/**
 * Sauvegarde du token dans le localStorage
 * @param {string} token 
 */
let saveToken = (token) => {
    localStorage.setItem('token', token);

    
}
let getUserProfile = () => {
    const tokenInfo = getToken(); // Correction ici

    if (tokenInfo) {
        return tokenInfo.profil; 
    } else {
        return null;
    }
};


/**
 * Suppression du token du localStorage
 */
let logout = () => {
    localStorage.removeItem('token')
}

/**
 * Etat de la présence d'un token en localStorage
 * @returns {boolean}
 */
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

/**
 * Récupération brut du token en localStorage
 * @returns {string}
 */
let getToken = () => {
    return localStorage.getItem('token')
}

/**
 * Récupération du payload du tkoen
 * @returns {object}
 */
let getTokenInfo = () => {
    const token = getToken();

    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
}
let getUserId = () => {
    return localStorage.getItem('userId');
}


let setUser = (userId, authToken) => {
    // Vous pouvez effectuer ici toute logique de stockage nécessaire
    // Peut-être sauvegarder l'ID de l'utilisateur dans le localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', authToken);
}


//pour recuperer l'utulisateur autentifier
let getUserData = (authToken) => {
    return Axios.get('http://localhost:8000/api/user', {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
    }).then(response => response.data);
}

// Ajoutez cette fonction à vos exports
export const accountService = {
    login, saveToken, logout, isLogged, getToken, getTokenInfo, getUserData,setUser,getUserId ,getUserProfile 
}

