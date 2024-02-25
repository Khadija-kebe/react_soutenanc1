import '../css/recomme.css'
import Footer from '../composant/footer';
import { Link, useParams } from 'react-router-dom';
import Header from '../composant/header';
import { useState ,useEffect } from 'react';
import Autre from './autre';
const Detailrecomme = () => {
    const { id } = useParams();
    const [recuperation, setRecuperation] = useState({});
    async function recuper() {
        const url = `http://127.0.0.1:8000/api/recomme${id}`;
        const data = await fetch(url, {
          method: 'GET',
        });
        const response = await data.json();
        setRecuperation(response);
        console.log(response);
      }
    
      useEffect(() => {
        recuper();
      }, [id]);
    return ( 
        <>
         <Header></Header>
             <darkert>
           
            <div class="containerkarlo">
                <div class="container__left">
            
                    <h1>{recuperation.Titre}</h1>
                    <p>
                    {recuperation.description}
                    </p>
                
                    <img src={'http://127.0.0.1:8000/storage/' + recuperation.image} alt="" />
                        <p>
                        {/* {recuperation.conseils} */}
                        </p>
                    {/* <button>Read our success stories</button> */}
                </div>
                <div class="container__right">
                    <div class="card">
                      {/* <img src={'http://127.0.0.1:8000/storage/' + recuperation.image} alt="" /> */}
                        <div class="card__content">
                            <span><i class="ri-double-quotes-l"></i></span>
                            <div class="card__details">
                                <p>
                                {recuperation.conseils}
                                </p>
                                <h4> Docteur {recuperation.prenom}</h4>
                            </div>
                    </div>
                </div>
                
                
                </div>
           </div>
    </darkert>
    <div className="racc">
        <h3>Autres recommandations</h3>
       <Autre></Autre>
    </div>
    <Footer></Footer>
        </>
     );
}
 
export default Detailrecomme;