import '../css/sante.css'

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Autre = () => {
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
    console.log(response);
    setloading(false);

    
   }
    return ( 
        <>
        <div className="katy">
    <h3>Recommandations recentes des veterinaires </h3>
  </div> 
       <div className="containerAA">
 
 <div className="card__containerAA" >
 {Affichage.map((product) => (
   <article className="card__article" key={product.id}>
     <img
       src={'http://127.0.0.1:8000/storage/' + product.image}
       alt={product.imageAlt}
       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
     />
     <div className="card__data">
       <span className="card__description">{product.Titre}</span>
       <h2 className="card__title">{product.description}</h2>
       <Link to={`/rome/${product.id}`} className="card__button">lire plus</Link>
     </div>
   </article>
     ))}
 </div>

</div>
        </>
     );
}
 
export default Autre;