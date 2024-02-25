import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import IMAGE from '../recommander/santecom';
import '../css/rendezvous.css';
import { Modal } from '@mui/material';

const Rendez = () => {
    const [affichage, setAffichage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // const [openModal, setOpenModal] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState({});
    // const [products, setProducts] = useState([]);
  
    // const handleOpenModal = (product, event) => {
    //     event.preventDefault();
    //     console.log('Handle Open Modal Called', event);
    //     setSelectedProduct(product);
    //     setOpenModal(true);
    // };
    
    
      
  
    // const handleCloseModal = () => {
    //   setOpenModal(false);
    // };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        listeVete();
    }, []);

    async function listeVete() {
        setLoading(true);
        const url = "http://localhost:8000/api/veteliste";
        const data = await fetch(url, {
            method: 'GET'
        });
        const response = await data.json();
        setAffichage(response);
        console.log(response);
        setLoading(false);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    return (
        <>
            <div className="vos">
                <div className="rendezvous">
                    <div className="rendez">
                        <div className="sliderrendd">
                            <div className="textrend">
                                <h1>Obtenez un rendez-vous avec le vétérinaire de votre choix</h1>
                            </div>
                            {loading ? (
                                <p>Chargement en cours...</p>
                            ) : (
                                <Slider className="sliderrend" {...settings}>
                                    {affichage.map((product, index) => (
                                        <div className="rendsir" key={product.id} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                                            <div className="imagerend">
                                                {product.user.image && (
                                                    <div className="image-container">
                                                        <img
                                                            src={'http://127.0.0.1:8000/storage/' + product.user.image}
                                                            alt={product.imageAlt}
                                                        />
                                                        {hoveredIndex === index && (
                                                            <div className="boutonDetails" >
                                                           <Link to={`/img/${product.id}`}>rv</Link>
                                                          </div>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="texterend">
                                                    <span>{product.user.prenom} {product.user.nom} {product.specialite}</span><br />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
{/*             
            <Modal open={openModal} onClose={handleCloseModal} className="custom-modal">
            <IMAGE product={selectedProduct} onClose={handleCloseModal} />
            </Modal> */}

        </>
    );
};

export default Rendez;
