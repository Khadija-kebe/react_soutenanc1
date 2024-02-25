import React, { useState } from 'react';
import '../css/login.css';
import { accountService } from '../service/account.service';
import '@fortawesome/fontawesome-free'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {

  //register
  const [showCabinetInput, setShowCabinetInput] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    prenom: '',
    nom: '',
    adresse: '',
    NumeroTelephone: '',
    profil: '',
    email: '',
    password: '',
    Nomcabinet: '', 
    specialite: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'profil' && value === 'veterinaire') {
      setShowCabinetInput(true);
    } else if  (name === 'profil' && value === 'eleveur') {
      setShowCabinetInput(false);
    }
    else if  (name === 'profil' && value === 'client') {
      setShowCabinetInput(false);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForUpload = new FormData();
    for (const key in formData) {
      formDataForUpload.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        body: formDataForUpload,
      });

      if (response.status === 201) { 
        setFormData({
          image: '',
          prenom: '',
          nom: '',
          adresse: '',
          NumeroTelephone: '',
          profil: '',
          email: '',
          password: '',
          Nomcabinet: '',
          specialite: '',
        });
      } else {
        console.error('Erreur lors de lajout de animal.');
      }
    } catch (error) {
      console.error('Une erreur est produite :', error);
    }
  };

  //login
const navigate = useNavigate();

const [credentials, setCredentials] = useState({
    email: '',
    password: ''
});



// Fonction de gestion des modifications des champs du formulaire
const token = localStorage.getItem('token'); 
const onChange = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
}

// Fonction de soumission du formulaire
const onSubmit = async (e) => {
  e.preventDefault();

  try {
      // Appel au service de connexion
      const res = await accountService.login(credentials);
      console.log(res.data.message);

      // Sauvegarde du token
      accountService.saveToken(res.data.message);

      // Obtention de l'ID de l'utilisateur
      const userData = await accountService.getUserData(res.data.message);
      const userId = userData.id;
      accountService.setUser(userId, res.data.message);
      const userProfile = userData.profil; 
      console.log(userProfile);
  
      accountService.setUser(userId, res.data.message);
  
   
      if (userProfile === 'veterinaire') {
        navigate('/veterinaire');
      } else if (userProfile === 'eleveur') {
        navigate('/eleveur');
      } else if (userProfile === 'admin') {
        navigate('/admin');
      }
      else if (userProfile === 'client') {
        navigate('/boutique');
      }
      
       else {
        navigate('/dashboard'); 
      }

      
      

  } catch (error) {
      console.error('Erreur lors de la connexion', error);
  }
}




  //login
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="contaitype">
    <div className={`containerr ${isSignup ? 'active' : ''}`}>
    <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h3>Creer un compte</h3>
            
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="registerForm">

          <input type="file"  name='image' onChange={handleImageChange} />
          <input type="text" placeholder="prenom"  name='prenom'  onChange={handleInputChange} />
          <input type="text" placeholder="nom"  name='nom'  onChange={handleInputChange} />
          <input type="text" placeholder="dakar" name='adresse'  onChange={handleInputChange}  />
          <input type="text" placeholder="770292023" name='NumeroTelephone'  onChange={handleInputChange}  />
           <select name="profil" id="" value={formData.profil} onChange={handleInputChange}  >
            <option value="client">client</option>
            <option value="eleveur">eleveur</option>
            <option value="veterinaire">veterinaire</option>
           </select>
           {showCabinetInput && (
  <>
    <input
      type="text"
      placeholder="Nom du cabinet"
      name="Nomcabinet"
      onChange={handleInputChange}
    />
    <input
      type="text"
      placeholder="specialite"
      name="specialite"
      onChange={handleInputChange}
    />
  </>
)}
          <input type="email" name='email' placeholder ="dija@gmail.com" onChange={handleInputChange}  />
          <input type="password" name='password'  placeholder ="saisir votre password" onChange={handleInputChange} />
            </div>
          <button className="registerButton"> S'inscrire</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={onSubmit}>
          <h1>Connectez vous!</h1>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i className="fab fa-twitter"></i></a>
  	 				<a href="#"><i className="fab fa-instagram"></i></a>
  	 				<a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        
          <input type="email"  name='email'  
            onChange={onChange}  value={credentials.email} placeholder='saisissai votre email' />
          <input type="password" placeholder="password" name='password' 
            onChange={onChange}   value={credentials.password}/>
          <a href="#">Mot de passe oublier?</a>
          <button>connecter</button>
          
        </form>
        
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <div className="closer">
            <h1 className='tagg'>Bienvenue sur SenTroupo</h1>
            </div>
            <p>Entrez vos informations personnelles pour utiliser toutes les fonctionnalités du site</p>  
              <button className={`hidden ${isSignup ? '' : 'active'}`} onClick={toggleForm}>
                Se connecter
              </button>
          </div>
          <div className="toggle-panel toggle-right">
            <div className="closer">
             <h1 className='tagg'>Bonjour , Connectez-vous</h1>
          </div>
          <p>Inscrivez-vous avec vos informations personnelles iuy pour utiliser toutes les fonctionnalités du site</p>
            <button className={`hidden ${isSignup ? 'active' : ''}`} onClick={toggleForm}>
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
