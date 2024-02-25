import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { accountService } from '../service/account.service';
import Header from '../composant/header';
import Footer from '../composant/footer';
// import { AuthContext } from './AuthContext';

import '../css/panier.css'
const Panier = () => {
  const navigate = useNavigate();

  const isAuthenticated = accountService.isLogged();

  const handlePasserALaCaisse = () => {
    if (isAuthenticated) {
      // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion.
      navigate('/commande');
    }
    else{
      navigate('/login');
    }
  }

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (productId) => {
    // Filtrer les éléments du panier pour enlever celui avec l'ID spécifié
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);

    // Mettre à jour le panier dans le stockage local
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalCartPrice = cart.reduce(
    (total, product) => total + product.prix * product.quantite,
    0
  );
  

  return (
    <>
  
      <Header></Header>
      <div className="sotie">
    <div className='trentee'>
      <div className="trent">
      {cart.map((product) => (
        <div key={product.id}>
          <div className="paniere">
            <div className="panier">
              <div className="panier1">
                <div className="panierimage">
                <img
                        src={'http://127.0.0.1:8000/storage/' + product.image}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                </div>
              </div>
              <div className="panier2">
                <h2>{product.Nom}</h2>
                <p className='pain'>
                
                {product.race},{product.NomAliments}
                </p>
              </div>
              <div className="panier3">
                  <div className='p3'>{product.prix}</div>
                  <div className='p4'> <img src="src/assets/image/Can.svg" alt="" onClick={() => removeFromCart(product.id)}/></div>
              </div>
             </div>
             
          </div>
        </div>
      ))}
      </div>
      <div className="teint">
                <h4>Prix total</h4>
                <div className='p5'>{ totalCartPrice}</div>
                 <button onClick={handlePasserALaCaisse}> Passer a la caisse </button>
             </div>
    </div>
    <Footer></Footer>
    </div>
   
    </>
  );
};

export default Panier;
