import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import Detail from './detail';
import Footer from '../composant/footer';
import Header from '../composant/header';
import '../css/shop.css';
import '../css/boutique.css';

const Boutique = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/lister');
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="ronder">
      <div className="tibou">
        <Header />
        <div className="headerb">
          <section className="maink">
            <div className="main-heading">
              <div>
                <h1>Bienvenue dans Notre Boutique en Ligne</h1>
              </div>
            </div>
          </section>
        </div>

        <div className="katy">
          <h3>Nos animaux</h3>
        </div>

        <div className="card-listerr">
          {products.map((product) => (
            <div className="card-item" key={product.id}>
              <div className="image12">
                <img
                  src={'http://127.0.0.1:8000/storage/' + product.image}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                <div className="contenterr">
                  <div className="fanta">
                    {/* <button  className="mert"> */}
                    <div className="cercle">
                    <img src="src/assets/image/single.svg" alt=""  onClick={() => handleOpenModal(product)}/>
                    </div>
                    <div className="cercle">
                    <img src="src/assets/image/single.svg" alt=""  onClick={() => handleOpenModal(product)}/>
                    </div>
                    <div className="cercle">
                    <img src="src/assets/image/cil.svg" alt=""  onClick={() => handleOpenModal(product)}/>
                    </div>
                      {/* <i onClick={() => handleOpenModal(product)} className="fa-solid fa-eye"></i> */}
                    {/* </button> */}
                  </div>
                </div>
              </div>

              <h6>
                {product.Nom} {product.race}
              </h6>
              <p>{product.prix}fcfa</p>
            </div>
          ))}
        </div>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Detail product={selectedProduct} onClose={handleCloseModal} />
      </Modal>
      <Footer />
      </div>
    </>
  );
};

export default Boutique;
