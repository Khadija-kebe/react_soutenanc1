import React from 'react'
import '../composantAdmin/anim.css'
// import { Modal } from '@mui/material';
import { accountService } from '../service/account.service';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react'
import '../composantAdmin/khadija'
function AdminRecomandation() {
    const token = localStorage.getItem('token'); 
    const [Affichage, setAffichage] = useState([]);
    const [loading, setloading] = useState(false);
  
    useEffect(() =>{
        getTodos();
      }, []);
  
    async function getTodos() {
        setloading(true);
        const url ="http://localhost:8000/api/indexlisteRecomandation";
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
         {/* <div>
            <div className="card-list">
                    {Affichage.map((product) => (
                    <div className="card-item" key={product.id}>
                            <img
                                    src={'http://127.0.0.1:8000/storage/' + product.image}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                    
                        <h6>{product.titre} </h6>
                        <p>{product.description}</p>
                        <p>{product.dateEnvoie}</p>
                        <div className="arrow">
                            <i className="fas fa-arrow-right card-icon"></i>
                        </div>
                    </div>
                    ))}
           </div>
           </div> */}


<div>
           
           <div className="details">
               <div className="recentOrders">
                   <div className="cardHeader">
                       <h2>liste des Recommandations</h2>
                       <a href="#" className="btnnn">voir tout</a>
                   </div>

                   <table>
                       <thead>
                           <tr>
                               <td>titre</td>
                               <td>description</td>
                               <td>dateEnvoie</td>
                               {/* <td>conseils</td> */}
                               <td>prenom_Veterinaire</td>
                               <td>nom_veterinaire</td>
                               {/* <td>image</td> */}
                               <td>numro Telephone</td>
                               <td>adresse</td>
                           </tr>
                       </thead>

                       <tbody>
                       {Affichage.map(commande => (
                           <tr>
                        
                               <td> {commande.Titre}</td>
                               <td>{commande.description}</td>
                               <td>{commande.dateEnvoie}</td>
                               {/* <td>{commande.conseils}</td> */}
                               <td>{commande.veterinaire.prenom}</td>
                               <td>{commande.veterinaire.nom}</td>
                               
                               {/* <td>
                                <img src={'http://127.0.0.1:8000/storage/' + commande.image} width={'70px'} height={'70px'} alt="" />
                               </td> */}
                               <td>{commande.veterinaire.NumeroTelephone}</td>
                               <td>{commande.veterinaire.adresse}</td>
                               {/* <td><button className='status delivered'  >
                                  Accepter 
                                   </button></td> */}
                               
                           </tr>

                       ))}
                       </tbody>
                   </table>
               </div>

              
           </div>
       </div>
    </>
  )
}

export default AdminRecomandation