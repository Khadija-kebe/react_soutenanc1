import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accountService } from '../service/account.service';
import Header from '../composant/header';
import Footer from '../composant/footer';
import '../css/commande.css'


const CommandeValidation = ({ onSuccess}) => {
  
  const userId = accountService.getUserId();
  const isAuthenticated = accountService.isLogged();
  const [userIdd, setUserId] = useState(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

console.log(userId);
  const [userInfo, setUserInfo] = useState({
    prenom: '',
    nom: '',
    adresse: '',
    NumeroTelephone: '',
    email: '',
  });
 
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    total: '',
    id_clients: '',
    adresse_de_livraison: '',
  });
formData.id_clients =userIdd;

  const [formError, setFormError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        total: cart.reduce((total, product) => total + product.prix * product.quantite, 0),
        id_clients: formData.id_clients,
        adresse_de_livraison: formData.adresse_de_livraison,
        panier: cart.map(item => ({
          id_animal: item.id,
          quantite: item.quantite,
          prix: item.prix,
        })),
      };
   
    
      const response = await fetch('http://localhost:8000/api/validation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setFormData({
          total: '',
          id_clients: '',
          adresse_de_livraison: '',

        });
        setCart([]);
        setFormError(null);
        localStorage.removeItem('cart');
        checkout();
        onSuccess();
      } else {
        setFormError('Erreur lors de la validation de la commande.');
      }
    
    } catch (error) {
      setFormError('Erreur lors de la communication avec le serveur.');
    }
  };

 // ...

useEffect(() => {
 
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  setCart(savedCart);

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
}, []);

// ...

  //prix total de la commande
  const totalCartPrice = cart.reduce(
    (total, product) => total + product.prix * product.quantite,
    0
  );
  useEffect(() => {
    const checkout = async () => {
      try {
        const apiKey = '20954542226581ff20b46a48.06123445';
        const siteId = '5866542';

        window.CinetPay.setConfig({
          apikey: apiKey,
          site_id: siteId,
          notify_url: 'http://mondomaine.com/notify/',
          mode: 'PRODUCTION',
        });

        const transactionId = Math.floor(Math.random() * 100000000).toString();

        const customerDetails = {
          customer_name: 'Joe',
          customer_surname: 'Down',
          customer_email: 'down@test.com',
          customer_phone_number: '088767611',
          customer_address: 'BP 0024',
          customer_city: 'Antananarivo',
          customer_country: 'CM',
          customer_state: 'CM',
          customer_zip_code: '06510',
        };

        const res = await window.CinetPay.getCheckout({
          transaction_id: transactionId,
          amount: totalCartPrice,
          currency: 'XOF',
          channels: 'ALL',
          description: 'Test de paiement',
          ...customerDetails,
        });

        console.log(res);

        window.CinetPay.waitResponse((data) => {
          if (data.status === 'REFUSED') {
            alert('Votre paiement a échoué');
            window.location.reload();
          } else if (data.status === 'ACCEPTED') {
            alert('Votre paiement a été effectué avec succès');
            window.location.reload();
            setShowPaymentModal(true);
          }
        });

        window.CinetPay.onError((data) => {
          console.log(data);
        });
        setShowCancelButton(true);
      } catch (error) {
        console.error(error);
      }
    };

    // Make the checkout function accessible globally
    window.checkout = checkout;

    // Load CinetPay script
    const script = document.createElement('script');
    script.src = "https://cdn.cinetpay.com/seamless/main.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script on component unmount
      document.body.removeChild(script);
    };
  }, [totalCartPrice]);
  


  const handleLogout = () => {
      accountService.logout(); // Appel de la fonction de déconnexion
      // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée.
    };

  return (
    <div  className='rendrecom'>
      <Header></Header>
       
            <div className="commande">
               <div className="karim">
                  <div className="comment">
                     <h3>Information du client </h3>
                     <form action="" onSubmit={handleSubmit}>
                    <div className="baserr">
                      
                    <div>
                        <label htmlFor="">prenom</label>
                      <input type="text" placeholder='prenom'
                      value={userInfo.prenom}
                      onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="">nom</label>
                      <input type="text" placeholder=''
                      value={userInfo.nom}
                      onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="">Adresse</label>
                      <input type="text" placeholder=''
                      value={userInfo.adresse}
                      onChange={(e) => setUserInfo({ ...userInfo, adresse: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="">Numero telephone</label>
                      <input type="text" placeholder=''
                      value={userInfo.NumeroTelephone}
                      onChange={(e) => setUserInfo({ ...userInfo, NumeroTelephone: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="">Email</label>
                      <input type="email" placeholder='' 
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}/>
                      </div>
                      <div>
                        <label htmlFor="">Adresse de livraison</label>
                        <input
                        type="text"
                        value={formData.adresse_de_livraison}
                        onChange={(e) =>
                          setFormData({ ...formData, adresse_de_livraison: e.target.value })
                        }
                      />
                      </div>
                        <div className='anuel1'>
                        <button type="button" >annuler commande</button>
                        </div>
                        <div  className='anuel2'>
                        <button type="submit">valider la commande</button>
                        </div>
                        
                      
                    </div>
                    </form>
                   
                  </div>
                  <div className="produrrr">
                          <div className="perte">
                            <h4> Vos commande</h4>
                            <div>
                            {cart.map((product) => (
                                <>
                                  <div className="ternerr" key={product.id}>
                                    <div className="dijakk">
                                      <img  src={'http://127.0.0.1:8000/storage/' + product.image}
                                       alt={product.imageAlt} />
                                    </div>
                                    <div className="rame">
                                      <h5>{product.Nom}</h5>
                                      <p>{product.prix} fcfa</p>
                                    </div>
                                  </div>
                                  <div className="decoration-line"></div>
                                </>
                              ))}

                            </div>
                            <div className="pric">
                              <div className="tott"><h4>Prix total:</h4></div>
                              <div>{totalCartPrice}Fcfa</div>
                            </div>
                            
                          </div>
                     
                  </div>
                    </div>
            </div>

            <Footer></Footer>
    </div>
  );
};

export default CommandeValidation;
