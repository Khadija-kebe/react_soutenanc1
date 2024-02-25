import React, { useState, useEffect } from 'react';
import '../composantAdmin/anim.css'
import { accountService } from '../service/account.service';
import { Link } from 'react-router-dom';
import { Modal } from '@mui/material';

import Recommandation from '../recommander/recommande';
const Recommander = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const token = localStorage.getItem('token'); 
    const [Affichage, setAffichage] = useState([]);
    const [loading, setloading] = useState(false);
  
    useEffect(() =>{
        getTodos();
      }, []);
  
    async function getTodos() {
        setloading(true);
        const url ="http://localhost:8000/api/remandation";
        const data = await fetch(url
            ,{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                  },
                
            });
        const response = await data.json();
        setAffichage(response);
        console.log(response.status);
        setloading(false);
    
        
       }
    return (
        <>
         <div className="router">
         <div class="cardHeader">
                        
           <button className="btntt" onClick={handleOpen}>ajouter</button> 
             </div>
            <div className="card-list">
              
            {Affichage.map((product) => (
            <div className="card-item" key={product.id}>
                      <img
                              src={'http://127.0.0.1:8000/storage/' + product.image}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
              
                <h6>{product.Titre} </h6>
                <p>{product.description}</p>
                <div className="arrow">
                                   <div >
                                    <Link className='rond' onClick={() => supprimer(product.id)} to="#">
                                        <i class="fa-solid fa-trash-can fa-lg"></i>
                                        </Link>
                                    </div>
                                    <div >
                                    <Link className='rond'  to={`/modi/${product.id}`}>
                                    <i class="fa-solid fa-pen-to-square fa-lg"></i>
                                        </Link>
                                    </div>
                </div>
            </div>
            ))}
       
       
       
    </div>
    </div>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Recommandation></Recommandation>
       
      </Modal>
        </>
      );
}
 
export default Recommander;