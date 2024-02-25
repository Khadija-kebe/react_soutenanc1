import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../composant/header';
import Footer from '../composant/footer';
import '../css/detail.css';

const Detail = ({ product, onClose }) => {
  const [cart, setCart] = useState([]);
  const [valide, setValide] = useState('');

  useEffect(() => {
    // Vous pouvez ajouter un code supplémentaire si nécessaire
  }, [product]);

  const HandleaddToCart = async () => {
    const productId = product.id; // Utilisez directement l'ID du produit depuis les propriétés
    const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];

    const isProductInCart = updatedCart.some((item) => item.id === productId);

    if (isProductInCart) {
      alert('Ce produit est déjà dans votre panier');
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/panier', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId }),
        });

        if (response.ok) {
          const productWithDetails = { ...product, quantite: 1 }; // Ajoutez d'autres détails si nécessaire
          updatedCart.push(productWithDetails);
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          setValide('Produit ajouté au panier');
        } else {
          alert("Erreur lors de l'ajout du produit au panier");
        }
      } catch (error) {
        console.error('Erreur lors de la requête au serveur', error);
      }
    }
  };

  return (
    <>
      {/* <Header />
      <i class="fa-solid fa-xmark"></i> */}
      <div className="detaxe">
     
        <div className="anta">
          <div className="detailles">
          <div className="redeur">
                    <button ><i class="fa-solid fa-xmark" onClick={onClose}></i></button>
                    </div>
            <div className="dot">
              <div className="app">
                <div className="details">
                  <div className="big-img">
                    <img src={'http://127.0.0.1:8000/storage/' + product.image} alt="" />
                  </div>
                  <div className="box">
                    <div className="row">
                      <h2>{product.Nom}</h2>
                      <span>{product.prix} fcfa</span>
                    </div>
                    <p>{product.Description}</p>
                    <p>{product.poids},{product.race},{product.NomAliments}</p>
                    <p>{product.Nom}</p>
                    <div className="det2">
                    <div className='d1'><img src={'http://127.0.0.1:8000/storage/' +  product.image} alt="" /></div>
                    <div className='d1'><img src={'http://127.0.0.1:8000/storage/' +  product.image} alt="" /></div>
                    <div className='d1'><img src={'http://127.0.0.1:8000/storage/' +  product.image} alt="" /></div>
                    <div className='d1'><img src={'http://127.0.0.1:8000/storage/' +  product.image} alt="" /></div>
                    </div>
                    <button className="cart" onClick={HandleaddToCart}>
                      Add to cart
                    </button>
                    <div className="p">{valide}</div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Detail;
