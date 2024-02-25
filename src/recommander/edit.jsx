import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../service/account.service';
import { useParams } from 'react-router-dom';
const Modifier = ({ product, onClose }) => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [userId, setUserId] = useState(null);
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
    const navigate = useNavigate();
  
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      setUserId(userId);
      // recuper();
      // getEdit();
    }, [id]);
  
  
   
    
  
    
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
    };
    formData.user_id =userId;
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/update/${id}`, {
          method: 'PUT',
          body: formDataToSend,
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          navigate('/eleveur');
          console.log('Animal mis à jour avec succès');
        } else {
          console.log('Erreur lors de la mise à jour de l\'animal');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'animal', error);
      }
    };
    return ( 
        <>
        <form className="ajoutt" action="" onSubmit={handleFormSubmit}>
        <div className="form">
          <div className="form1">
            <label htmlFor="Nom">Nom</label>
            <input type="text" name="Nom" onChange={handleInputChange}  value={product.Nom} />

            <label htmlFor="race">Race</label>
            <select name="race" onChange={handleInputChange} value={product.race}>
              <option value="ladoum">ladoum</option>
              <option value="ladoum">ladoum</option>
            </select>

            <label htmlFor="poids">Poids</label>
            <input type="text" name="poids" placeholder="Poids" onChange={handleInputChange} value={product.poids} />

            <label htmlFor="NomAliments">Nom aliment</label>
            <input type="text" name="NomAliments" placeholder="Nom aliment" onChange={handleInputChange} value={product.NomAliments}/>


            <label htmlFor="quantite">Quantité</label>
            <input type="number" name="quantite" placeholder="Quantité" onChange={handleInputChange} value={product.quantite}  />
          </div>

          <div className="form2">
            <label htmlFor="sexe">Sexe</label>
            <select name="sexe" onChange={handleInputChange} value={product.sexe} >
              <option value="bb">bb</option>
              <option value="mal">mal</option>
              <option value="femelle">femelle</option>
            </select>

            <label htmlFor="age">Age</label>
            <input type="number" name="age"  onChange={handleInputChange} value={product.age} />

            <label htmlFor="prix">Prix</label>
            <input type="number" name="prix"  onChange={handleInputChange} value={product.prix}  />

            <label htmlFor="image">Choisir Image</label>
            <input type="file" name="image" onChange={handleImageChange}   />
            <label htmlFor="description">Description</label>
            <input type="text" name="Description"  onChange={handleInputChange} value={product.Description} />
            
          </div>
         
        </div>
        <div className="ajouta">
        <button  >Modifier</button>
        </div>
       
      </form>
        </>
     );
}
 
export default Modifier;