import '../recommander/image.css'
import Footer from '../composant/footer';
import Header from '../composant/header';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { accountService } from "../service/account.service";
import { Link } from 'react-router-dom';

const IMAGE = () => {
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
formData.id_eleveur =userId;
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
      alert('votre rendez-vous a ete bien prise une notification vous seras envoyer lorsque le veterinaire accepte');
      setFormData({
        date: '',
        id_eleveur: '',
        heure: '',
        Motif:''
      });     
      
    } else { 
      alert('assurer que vous avez un profil eleveurs');
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
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
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
    return ( 
        <>
        <div className="telet">
        <div className="tele">
                <Header></Header>
                <div className="Contact">
               
                <div className="Contacts">
                    <div className="vetcontacte">
                        <div className='tene'>Finaliser votre rendez-vous avec ce </div>
                        <span className='keb'><div className='tene'>veterinaire</div></span>
                        <div className="valide">
                        {/* <img className='' src="src/assets/image/corne.svg" alt="" />
                        <h5>Khadija kebe</h5> */}
                        <div className="localer">
                            <div className="loca1">
                                <div className="loca2">
                                    <span><Link to='' className='vert'><i class="fa-solid fa-user-doctor"></i></Link></span>
                                    <span>{recuperation.specialite}</span>
                                </div>
                                <div className="loca2">
                                    <span><Link to='' className='vert'><i class="fa-solid fa-envelope"></i></Link></span>
                                    <span>{recuperation.user?.email}</span>
                                </div>
                            </div>
                            <div className="loca1">
                                <div className="loca2">
                                    <span><Link to='https://www.google.com/maps' className='vert'><i class="fa-solid fa-location-dot"></i></Link></span>
                                    <span>{recuperation.user?.adresse}</span>
                                </div>
                                <div className="loca2">
                                    <span><Link to='' className='vert'><i class="fa-solid fa-phone-volume"></i></Link></span>
                                    <span>{recuperation.user?.NumeroTelephone}</span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="contacttext">
                        <div class="form_contact">
                            <h3>Envoyer un message</h3>
                            <form action="" method="post" onSubmit={handleSubmit}>
                                <input type="text"placeholder="Prenom"
                                 value={userInfo.prenom}
                                 onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })} required/>
                                <input type="text"placeholder="nom"
                                value={userInfo.nom}
                                onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}required/>

                                <input type="email"
                                 value={userInfo.email}
                                 onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}required/>

                                <input type="date" name='date'
                                value={formData.date}
                                onChange={(e) =>
                                  setFormData({ ...formData, date: e.target.value })
                                }/>
                                <input type="time" name='heure'
                                 value={formData.heure}
                                 onChange={(e) =>
                                   setFormData({ ...formData, heure: e.target.value })
                                 }/>
                                <input type="text" name='Motif' 
                                value={formData.Motif}
                                onChange={(e) =>
                                  setFormData({ ...formData, Motif: e.target.value })
                                } placeholder='saisir l heure qui vous arrange' required />
                                <div className='soumettre'>
                                <button type='submit'>Soumettre</button>
                                </div>
                                 
                            </form>
                        </div>
                    </div>
                </div>
                
                </div>
                
        </div>
      
        </div>
     
        </>
     );
}
 
export default IMAGE;