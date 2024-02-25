import React from 'react';
import '../recommander/liste.css'
import { Modal } from '@mui/material';
import { accountService } from '../service/account.service';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Userdetail from './detailsuser';
const Liste = () => {
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
        const url ="http://localhost:8000/api/userliste";
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
           <div className="utule">
          
           
           </div>
           <div className="listeusert">
           
                <div className="users">
                {Affichage.map((product) => (
                  <div className="usertr" key={product.id}>
                 
                        <div>
                        <img
                              src={'http://127.0.0.1:8000/storage/' + product.image}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div>
                        <h3>{product.prenom} {product.nom}</h3>
                        <p>{product.profil}</p>
                        </div>
                        <div className="admid">
                            {/* <span>  <Link className='suppe'><i className="fa-solid fa-delete-left"></i></Link></span>
                            <span>  <Link className='edi'><i className="fa-solid fa-lock"></i></Link></span> */}
                            <span><button onClick={handleOpen}>details</button></span>
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
        <Userdetail></Userdetail>
       
      </Modal>
        </>
    );
};

export default Liste;
