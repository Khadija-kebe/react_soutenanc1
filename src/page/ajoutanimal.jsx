import '../css/ajout.css'
import React, { useState, useEffect } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { accountService } from '../service/account.service';


const Ajoutanimal = () => {
  const [userId, setUserId] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    
    const id = localStorage.getItem('userId');
    setUserId(id);
  }, []);

  const [formVisible, setFormVisible] = useState(true);
  console.log('ID de l\'utilisateur connecté :', userId);
 
  const [formData, setFormData] = useState({
    Nom: '',
    race: 'ladoum', 
    poids: '',
    NomAliments: '',
    quantite: '',
    sexe: 'bb', 
    age: '',
    prix: '',
    Description: '',
    user_id: '',
    image: null,
  });
formData.user_id = userId;
console.log(formData.user_id);

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
      const token = localStorage.getItem('token'); 
      const response = await fetch('http://localhost:8000/api/ajouter', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      if (response.ok) {
        setFormVisible(false);
         alert('votre ajout a bien reussi')
      } else {
        console.log('Erreur lors de la création de l\'animal');
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'animal', error);
    }
  };

  return (
    <>
     {formVisible && (
      <form className="ajoutt" action="" onSubmit={handleSubmit}>
        <div className="form">
          <div className="form1">
            <label htmlFor="Nom">Nom</label>
            <input type="text" name="Nom" placeholder="Nom" onChange={handleInputChange} />

            <label htmlFor="race">Race</label>
            <select name="race" onChange={handleInputChange} value={formData.race}>
              <option value="ladoum">ladoum</option>
              <option value="ladoum">ladoum</option>
            </select>

            <label htmlFor="poids">Poids</label>
            <input type="text" name="poids" placeholder="Poids" onChange={handleInputChange} />

            <label htmlFor="NomAliments">Nom aliment</label>
            <input type="text" name="NomAliments" placeholder="Nom aliment" onChange={handleInputChange} />


            <label htmlFor="quantite">Quantité</label>
            <input type="number" name="quantite" placeholder="Quantité" onChange={handleInputChange} />
          </div>

          <div className="form2">
            <label htmlFor="sexe">Sexe</label>
            <select name="sexe" onChange={handleInputChange} value={formData.sexe}>
              <option value="bb">bb</option>
              <option value="mal">mal</option>
              <option value="femelle">femelle</option>
            </select>

            <label htmlFor="age">Age</label>
            <input type="number" name="age" placeholder="Age" onChange={handleInputChange} />

            <label htmlFor="prix">Prix</label>
            <input type="number" name="prix" placeholder="Prix" onChange={handleInputChange} />

            <label htmlFor="image">Choisir Image</label>
            <input type="file" name="image" onChange={handleImageChange} />
            <label htmlFor="description">Description</label>
            <input type="text" name="Description" placeholder="Description" onChange={handleInputChange} />
            
          </div>
         
        </div>
        <div className="ajouta">
        <button>Ajouter</button>
        </div>
       
      </form>
     )}
    </>
  );
};

export default Ajoutanimal;
