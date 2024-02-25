import React from 'react';
import '../recommander/contour.css'
import { useState,useEffect } from 'react';
import { Modal } from '@mui/material';
import Ajoutanimal from '../page/ajoutanimal';
import Modifier from './edit';
import { accountService } from '../service/account.service';
import { Link } from 'react-router-dom';
const Contour = () => {
    const token = localStorage.getItem('token'); 
    const [openAjoutanimal, setOpenAjoutanimal] = useState(false);
    
    const handleOpenAjoutanimal = () => setOpenAjoutanimal(true);
    const handleCloseAjoutanimal = () => setOpenAjoutanimal(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    const [openModal, setOpenModal] = useState(false);
    const [products, setProducts] = useState([]);
  
    const handleOpenModal = (product) => {
      setSelectedProduct(product);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  

    const userId = accountService.getUserId();
    const [Affichage, setAffichage] = useState([]);
    const [loading, setloading] = useState(false);
  
    useEffect(() =>{
        getTodos();
      }, []);
  
    async function getTodos() {
        setloading(true);
        const url ="http://localhost:8000/api/listeeleveur";
        const data = await fetch(url
            ,{
                method:'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
            });
            if (data.status === 200) {
              const response = await data.json();
              const userArticles = response.filter((item) => item.user_id == userId);
              setAffichage(userArticles);
              console.log(userArticles);
              setloading(false);
            }
        
    console.log(userId);

        
       }

       async function supprimer(id) {
        const url = `http://localhost:8000/api/destroy${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 205) {
          const nouvelleListe = Affichage.filter((product) => product.id !== id);
          setAffichage(nouvelleListe);
        }
      }
    return (
        <>
        
        <div className="router">
        <div class="cardHeader">
                        
                       <button className="btntt" onClick={handleOpenAjoutanimal }>ajouter</button> 
                    </div>
        <div className="card-list">
       
            {Affichage.map((product) => (
            <div className="card-item" key={product.id}>
                      <img
                              src={'http://127.0.0.1:8000/storage/' + product.image}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
              
                <h6>{product.Nom} </h6>
                <p>Poids:{product.poids}kg,Race:{product.race},{product.NomAliments}</p>
                <p> Sexe:{product.sexe},Prix:{product.prix},Age:{product.age}</p>
                {/* <p>{product.Description}</p> */}
                <div className="arrow">
                                   <div >
                                    <Link className='rond' onClick={() => supprimer(product.id)} to="#">
                                        <i class="fa-solid fa-trash-can fa-lg"></i>
                                        </Link>
                                    </div>
                                    <div >
                                    {/* <Link className='rond'  to={`/modi/${product.id}`}> */}
                                    <i class="fa-solid fa-pen-to-square fa-lg"  onClick={() => handleOpenModal(product)}></i>
                                        {/* </Link> */}
                                    </div>
                </div>
            </div>
            ))}
       
       
       
    </div>
    </div>
    <Modal
        open={openAjoutanimal}
        onClose={handleCloseAjoutanimal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Ajoutanimal />
      </Modal>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Modifier product={selectedProduct} onClose={handleCloseModal} />
      </Modal>
      
        </>
      );
}
 
export default Contour;