import '../css/ajout.css'
import React, { useState, useEffect } from 'react';
import { accountService } from '../service/account.service';


const Recommandation = ({onClose}) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Récupérez l'ID de l'utilisateur depuis le localStorage
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

  // Utilisez maintenant userId dans votre composant comme nécessaire
  console.log('ID de l\'utilisateur connecté :', userId);
 
  const [formData, setFormData] = useState({
   
    description: '',
    id_veterinaire: '',
    image: null,
    dateEnvoie:'',
    Titre:'',
    conseils:''
  });
formData.id_veterinaire = userId;
console.log(formData.id_veterinaire);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem('token'); // Récupérez le token du localStorage

      const response = await fetch('http://localhost:8000/api/AjouteRecomandation', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`, // Ajoutez le token d'authentification dans l'en-tête
        },
      });
      if (response.status === 200) {
        console.log('Animal créé avec succès');
      } else {
        console.log('Erreur lors de la création de l\'animal');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'animal', error);
    }
  };

  return (
    <>
   
      <form className="ajoutt" action="" onSubmit={handleSubmit}>
        <div className="form">
          <div className="form1">
            <label htmlFor="Nom">description</label>
            <input type="text" name="description" placeholder="description" onChange={handleInputChange} />


            <label htmlFor="date">date d'envoie</label>
            <input type="date" name="dateEnvoie" placeholder="Quantité" onChange={handleInputChange} />
        
            <label htmlFor="titre">Titre</label>
            <input type="text" name="Titre" placeholder="titre" onChange={handleInputChange} />
            <label htmlFor="titre">Conseils</label>
            <input type="text" name="conseils" placeholder="conseils" onChange={handleInputChange} />


            <label htmlFor="image">Choisir Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
            <div className='mbayang'>
            <button>Ajouter</button>
            </div>
           
          </div>
        </div>
      </form>
    </>
  );
};

export default Recommandation;
