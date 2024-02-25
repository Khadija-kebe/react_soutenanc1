import React, { useState, useEffect } from 'react';
import '../composantAdmin/khadija.css';
import { accountService } from '../service/account.service';
const CommandesListe = () => {
    const token = localStorage.getItem('token'); 
    const [affichage, setAffichage] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = accountService.getUserId();
    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        setLoading(true);
        const url = "http://localhost:8000/api/listecommande";
        const data = await fetch(url, {
            method: 'GET'
        });
        const response = await data.json();
        // setAffichage(response);
        const userArticles = response.filter((item) => item.utilisateur.id == userId);
              setAffichage(userArticles);
    console.log(response);
        setLoading(false);
    }

    async function accepterCommande(id) {
        const url = `http://localhost:8000/api/accepte${id}`;
        

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    
                    'Authorization': `Bearer ${token}`,  // Ajoutez votre jeton d'authentification ici
                },
            });

            if (response.ok) {
                // console.log('Réponse serveur:', data);
                // Mise à jour réussie, actualisez les données ou faites ce qui est nécessaire
                getTodos();
            } else {
                console.error('Erreur lors de la mise à jour de l\'état de la commande');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'état de la commande', error);
        }
    }

    return (
        <div>
           
            <div className="details">
                <div className="recentOrders">
                    <div className="cardHeader">
                        <h2>Les commandes</h2>
                        <a href="#" className="btnnn">View All</a>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <td>NomAnimal</td>
                                <td>Prix</td>
                                <td>Adresse_livraison</td>
                                <td>Prenom_client</td>
                                <td>Nom</td>
                                <td>Numero_tel</td>
                                {/* <td>Status</td> */}
                            </tr>
                        </thead>

                        <tbody>
                        {affichage.map(commande => (
                            <tr>
                                  {commande.animals.map(produit => (
                                  <td >{produit.animal.Nom}</td>
                                  ))}
                                <td> {commande.total}</td>
                                <td>{commande.adresse_de_livraison}</td>
                                <td>{commande.utilisateur.prenom}</td>
                                <td>{commande.utilisateur.nom}</td>
                                <td>{commande.utilisateur.NumeroTelephone}</td>
                                {/* <td><button className='status delivered'  onClick={() => accepterCommande(commande.id)}>
                                   Accepter 
                                    </button></td> */}
                                
                            </tr>

                        ))}
                        </tbody>
                    </table>
                </div>

               
            </div>
        </div>

    );
};

export default CommandesListe;
