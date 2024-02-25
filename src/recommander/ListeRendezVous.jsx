import React ,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { accountService } from '../service/account.service';
import '../recommander/odre.css'
import { toast } from 'react-toastify';

function ListeRendezVous() {
    const userId = accountService.getUserId();
    const isAuthenticated = accountService.isLogged();
    const [userIdd, setUserId] = useState(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');


    console.log(userId);

    const [Affichage, setAffichage] = useState([]);
    
  
    useEffect(() =>{
        listeRendezVous();
        refusRendez();
        acceptRendez()

      }, []);
  
    async function listeRendezVous() {
        
        const url ="http://localhost:8000/api/rendezVous";
        const data = await fetch(url
            ,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer +${token}`
                }
            });
        
        if (data.status === 201) {
            const response = await data.json();
            const userRendez = response.filter((item)=>item.id_veterinaire == userId);
            setAffichage(userRendez);
            console.log(userRendez);
            console.log("Rendez-vous du vétérinaire connecté :", userRendez);
        }
        else {
            console.error('Erreur lors de la récupération des rendez-vous');
          }
       }

       const acceptRendez = async(rendezVousId) =>{
        const response = await fetch(`http://localhost:8000/api/accepterRendezvous/${rendezVousId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
       })
       if (response.ok) {
        // Mettez à jour l'état 'rendezVousList' pour refléter le changement
        // Assumez que 'rendezVousList' est un état dans votre composant qui contient la liste des rendez-vous
        
        // await listeRendezVous();
        setAffichage((prevAffichage) =>
      prevAffichage.map((rendezVous) =>
        rendezVous.id === rendezVousId ? { ...rendezVous, status: 'accepté' } : rendezVous
      )
    );
         // Assumez que fetchRendezVousList est une fonction qui récupère la liste des rendez-vous depuis le backend
       
  
        // Afficher une notification ou effectuer toute autre action nécessaire
        toast.success('Rendez-vous accepté avec succès');
      } else {
        console.error('La requête pour accepter le rendez-vous a échoué.');
      }
    }
    const refusRendez = async(rendezVousId) =>{
      const response = await fetch(`http://localhost:8000/api/refuserRendezvous/${rendezVousId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
   })
   if (response.ok) {
    // Mettez à jour l'état 'rendezVousList' pour refléter le changement
    // await listeRendezVous();
    setAffichage((prevAffichage) =>
      prevAffichage.map((rendezVous) =>
        rendezVous.id === rendezVousId ? { ...rendezVous, status: 'refusé' } : rendezVous
      )
    );

    // Afficher une notification ou effectuer toute autre action nécessaire
    toast.success('Rendez-vous refusé avec succès');
  } else {
    console.error('La requête pour refuser le rendez-vous a échoué.');
  }

    }
       
  return (
   <>
   

   <div className="recent-orders">
               <h2>Mes rendez-vous</h2>
               <table>
                   <thead>
                       <tr>
                           <th> prenom eleveur </th>
                           <th> nom eleveur</th>
                           <th> Telephone</th>
                           <th> Adresse</th>
                           <th> Motis RV</th>
                           <th>Date du RDV </th>
                           <th>Heure</th>
                           <th >Status</th>
                           <th colSpan={2}>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                   {Affichage.map(rendezVousItem => (
              <tr key={rendezVousItem.id}>
                <td>{rendezVousItem.eleveurs[0].prenom}</td>
                <td>{rendezVousItem.eleveurs[0].nom}</td>
                <td>{rendezVousItem.eleveurs[0].NumeroTelephone}</td>
                <td>{rendezVousItem.eleveurs[0].adresse}</td>
                <td>{rendezVousItem.Motif}</td>
                <td>{rendezVousItem.dateRendezVous}</td>
                <td>{rendezVousItem.heure}</td>
                <td>{rendezVousItem.status}</td>
                <td className='clike'>
                <button onClick={() => acceptRendez(rendezVousItem.id)}>Accepter</button>
                <button onClick={() => refusRendez(rendezVousItem.id)}>Refuser</button>
                </td>
                {/* <td><a href="#">supprimer</a></td> */}
              </tr>
          ))}
                   </tbody>
               </table>
              
           </div>
   
   </>
  )
}

export default ListeRendezVous