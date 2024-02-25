import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { accountService } from "../service/account.service";
import '../css/rendezvous.css'
const Rendezvous = () => {
    const token = localStorage.getItem('token'); 
    const { id } = useParams();
    const userId = accountService.getUserId();
    const isAuthenticated = accountService.isLogged();
    const [formData, setFormData] = useState({
        date: '',
        id_eleveur: '',
        heure: '',
        Motif:''
      });
    formData.id_users =userId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const nouveauRendezVous = {
            dateRendezVous: formData.date,
            heure: formData.heure,
            Motif:formData.Motif,
            id_eleveur: userId,
            id_veterinaire: id, // Utilisez l'identifiant récupéré de useParams()
        };
    
        const response = await fetch('http://localhost:8000/api/rendez', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
              },
            body: JSON.stringify(nouveauRendezVous),
        });
        console.log(response);
    
        if (response.ok) {
            // Le rendez-vous a été créé avec succès
            // Mettez à jour l'état local ou effectuez toute autre action nécessaire
            console.log(response);
        } else {
            // Il y a eu une erreur lors de la création du rendez-vous
            console.error('Erreur lors de la création du rendez-vous');
        }
      }
    
    const [userInfo, setUserInfo] = useState({
        prenom: '',
        nom: '',
        adresse: '',
        NumeroTelephone: '',
        email: '',
      });
      useEffect(()=>{
        if (isAuthenticated && userId ) {
  
            // Faites une requête vers le backend pour récupérer les informations de l'utilisateur
            fetch(`http://localhost:8000/api/userlistee${userId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setUserInfo(data); 
                console.log(setUserInfo); // Stockez les informations de l'utilisateur dans l'état
              })
              .catch((error) => {
                console.error(error);
              });
          }

      },[isAuthenticated, userId])
     
   //recuperation
  
    const [recuperation, setRecuperation] = useState({ user: { image: '' } });
    const [loading, setloading] = useState(false);
    useEffect(() => {
      
        recuper();
      }, [id]);
    async function recuper() {
        setloading(true);
      const url = `http://localhost:8000/api/detailsVeterinaire${id}`;
      const data = await fetch(url, {
        method: 'GET',
      });
      const response = await data.json();
      setRecuperation(response);
      console.log(response)
      setloading(false);
    }
  
    //recuperation
    return ( 
        <>
        
        {/* <div className="imrebd">
        <img src={'http://127.0.0.1:8000/storage/' + recuperation.user?.image} alt={recuperation.imageAlt} />
        </div>
        <div>
        <div>{recuperation.user.prenom}</div>
            <div>{recuperation.specialite}</div>
        </div> */}
        <div className="rendezVous">
                    <div className="gridRendez">
                    <div className="infoVete">
                    <img src={'http://127.0.0.1:8000/storage/' + recuperation.user?.image} alt={recuperation.imageAlt} />
                        <h1>{recuperation.user.prenom}  {recuperation.user.nom}</h1>
                        <p>{recuperation.specialite}</p>
                        <div className="localisat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg> 
                            <span>{recuperation.user.adresse}</span>
                        </div>

                        <div className="localisat">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg>
                            <span>{recuperation.user.NumeroTelephone}</span>
                        </div>

                        <div className="localisat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                                </svg>
                                <span>Ouverte de &nbsp; {recuperation.debut_travail_semaine}  &nbsp; a  &nbsp; {recuperation.fin_travail_semaine}</span>
                        </div>
                    
                        <img className='imageForm' src="src/assets/image/3886130-removebg-preview.png" width="" alt="" />
                    </div>
                    <div className="rendezForm">
                        <h2>Prendre Rendez-vous</h2>
                        <form action="" method="post" onSubmit={handleSubmit}>
                            <div className="formulaireRendezVous">
                                <label htmlFor="">Prenom</label>
                                <input type="text" value={userInfo.prenom}
                                onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })} required />
                            </div>
                            <div className="formulaireRendezVous">
                                <label htmlFor="">Nom</label>
                                <input type="text" value={userInfo.nom}
                                onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}required />
                            </div>

                            <div className="formulaireRendezVous">
                                <label htmlFor="">Email</label>
                                <input type="email" value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}required />
                            </div>

                            <div className="formulaireRendezVous">
                                <label htmlFor="">Date</label>
                                <input type="date" name='date' 
                                value={formData.date}
                                onChange={(e) =>
                                  setFormData({ ...formData, date: e.target.value })
                                }
                                
                                placeholder='saisir la date qui vous arrange' required />
                            </div>
                            <div className="formulaireRendezVous">
                                <label htmlFor="">heure</label>
                                <input type="time" name='heure' 
                                 value={formData.heure}
                                 onChange={(e) =>
                                   setFormData({ ...formData, heure: e.target.value })
                                 } placeholder='saisir l heure qui vous arrange' required />
                            </div>
                            <div className="formulaireRendezVous">
                                <label htmlFor="">Motif</label>
                                <input type="text" name='Motif' 
                                 value={formData.Motif}
                                 onChange={(e) =>
                                   setFormData({ ...formData, Motif: e.target.value })
                                 } placeholder='saisir l heure qui vous arrange' required />
                            </div>
                            <button type='submit' className="login_btn">soumetre</button>
                        </form>
                    </div>
                    </div>
                </div>
        </>
     );
}
 
export default Rendezvous;