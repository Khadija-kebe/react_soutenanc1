import React , {useState,useEffect} from 'react'
import '../composantAdmin/khadija.css'
function AdminAnimaux() {

    const token = localStorage.getItem('token'); 
    const [affichage, setAffichage] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        setLoading(true);
        const url = "http://localhost:8000/api/indexlisteAnimaux";
        const data = await fetch(url
            ,{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                  },
                
            });
        const response = await data.json();
        console.log(response)
        setAffichage(response);
        setLoading(false);
    }
  return (
    <>
    <div>
           
           <div className="details">
               <div className="recentOrders">
                   <div className="cardHeader">
                       <h2>liste Animaux</h2>
                       <a href="#" className="btnnn">voir tout</a>
                   </div>

                   <table className='table  table-hover'>
                       <thead>
                           <tr>
                               <td>image</td>
                               <td>Race</td>
                               <td>Poids</td>
                               <td>Nom_Aliments</td>
                               <td>quantite</td>
                               <td>NomAnimal</td>
                               <td>prenom_Eleveur</td>
                               <td>nom_Eleveur</td>
                           </tr>
                       </thead>

                       <tbody>
                       {affichage.map(commande => (
                           <tr>
                        
                               <td> <img src={'http://127.0.0.1:8000/storage/' + commande.image} width={'60px'} height={'60px'} alt="" /></td>
                               <td>{commande.race}</td>
                               <td>{commande.poids}</td>
                               <td>{commande.NomAliments}</td>
                               <td>{commande.quantite}</td>
                               
                               <td>
                               {commande.Nom}  
                               </td>
                               <td>{commande.user.prenom}</td>
                               <td>{commande.user.nom}</td>
                               
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

export default AdminAnimaux