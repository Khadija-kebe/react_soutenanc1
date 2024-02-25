import React from 'react'
import '../css/sante.css'
import Header from '../composant/header';
import Footer from '../composant/footer';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rendez from './rendezvous';
import Autre from './autre';
// import IMAGE from '../recommander/santecom';

function SanteAnimal() {

  

const [Affichage, setAffichage] = useState([]);
const [loading, setloading] = useState(false);

useEffect(() =>{
    getTodos();
  }, []);

async function getTodos() {
    setloading(true);
    const url ="http://localhost:8000/api/listerrecommande";
    const data = await fetch(url
        ,{
            method:'GET'
        });
    const response = await data.json();
    setAffichage(response);
    console.log(response.status);
    setloading(false);

    
   }
  return (
  <>
  <div className="tenue">
  <div className="santer">
      <Header></Header>
                <div className="header">
                
                            </div>
                            <div className="santeAnimal">
                                <div className="textesante">
                                
                                    <h3>Conseils Sanitaires et nutritionnels des vétérinaires </h3>
                                    {/* <p>C'est pourquoi nous avons créé une solution complète pour rendre la gestion de votre exploitation plus facile, plus efficace et plus gratifiante.</p> */}
                                    {/* <p> vous aimez vos moutons et souhaitez lui offrir une vie sereine et agréable.
                                    
                                    </p>

                                     */}
                                </div>
                            </div>


                        
                    </div>
                    <main className="sonseilNutr">
  
  <Autre></Autre>
  
</main>

               
     </div>
  
      <Rendez></Rendez>
      <Footer></Footer>
  </>
  )
}

export default SanteAnimal