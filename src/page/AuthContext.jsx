// // Importez localStorage
// import React, { createContext, useContext, useReducer } from 'react';

// // Créez un contexte d'authentification
// export const AuthContext = createContext();

// // Actions pour le gestionnaire de l'état d'authentification
// const SET_USER = 'SET_USER';
// const LOGOUT = 'LOGOUT';

// // Reducer pour gérer l'état d'authentification
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, isAuthenticated: true, userId: action.payload,
        
//        };
//     case LOGOUT:
//       return { ...state, isAuthenticated: false, userId: null };
//     default:
//       return state;
//   }
// };

// // Composant ContextProvider pour englober l'application
// export const AuthProvider = ({ children }) => {
//   const [authState, dispatch] = useReducer(authReducer, {
//     isAuthenticated: false,
//     userId: null,
//   });

//   const setUser = (userId, authToken) => {
//     // Stockez le jeton d'authentification dans le local storage
//     localStorage.setItem('token', authToken);
//     dispatch({ type: SET_USER, payload: userId });
//   };
  

//   const logout = () => {
//     // Supprimez le jeton d'authentification du local storage
//     localStorage.removeItem('token');
//     dispatch({ type: LOGOUT });
//   };

//   return (
//     <AuthContext.Provider value={{ ...authState, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
