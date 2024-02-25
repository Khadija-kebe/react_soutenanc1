import '../css/acceuil.css'
import '../css/responsive.css'
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../composant/footer';
import Header from '../composant/header';
import { Link } from 'react-router-dom';
import Video from './video';
import Shopping from './shopping';
import '../css/video.css'
const Acceuil = () => {
  // const [openModal, setOpenModal] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);

  // const handleOpenModal = (product) => {
  //   setSelectedProduct(product);
  //   setOpenModal(true);
  // };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/lister');
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, []);

    const handleLogout = () => {
        logout(); // Appel de la fonction de déconnexion
        // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée.
      };
    // slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll:1,
        autoplay: true, // Ajout de l'autoplay
        autoplaySpeed: 1000, // Vitesse de défilement automatique en millisecondes
      };
      const parametre = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    return (  
        <>
        <div className="containeracceuil">
            <Header></Header>
            <div className="header">

                <div className="imgg ">
                    <div className="texte">
                        <h2>Bienveue sur notre plateforme dédiée à simplifier l'élevage</h2>
                        <p>C'est pourquoi nous avons créé une solution complète pour rendre la gestion de votre exploitation plus facile, plus efficace et plus gratifiante.</p>
                        <div className="button">
                            {/* <div className="button1">
                                <button><a href="">Qui sommes nous?</a></button>
                            </div>
                            {/* <div className="button2">
                                <button><a href="">Rejoingnez nous </a></button>
                            </div> */} */}
                        
                        </div>
                    </div>
                </div>
            </div>

           
               
                    <Shopping></Shopping>
                  <div class="section__containereur about__containereur" id="about">
      <div class="section__header">A propos de L'elevage</div>
      <p class="section__description">
      L'élevage, c'est bien plus qu'une simple activité économique ; c'est un art transmis de génération en génération. Les éleveurs, véritables gardiens du bien-être animal, dédient leur vie à la préservation des races, au développement de lignées exceptionnelles, et à l'établissement de liens durables avec leurs animaux. Chaque geste, chaque décision prise dans le monde de l'élevage reflète un profond respect pour la vie et un engagement envers la durabilité.
      </p>
    </div>
                
                    <div className="elevage">
                    
                    <Video></Video>
                </div>
           
            
            <div className="eleveur">
                 <h2>Nos Services</h2>
                  <div className="localiser">
                <div className="loger">
                    <div className="fall">
                    
                    
                    </div>
                    <div className="localiter">
                        <div className="logimg">
                          <div className="merdrr"><img className='' src="src/assets/image/localite.svg" alt="" /></div>
                            <div className="textlog">
                                <h3>Pour les eleveur</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, doloremque suscipit, cumque, facilis
                                    sapiente illo neque non dolore in nam tempore temporibus iste debitis. A quasi quo illo ex rerum.
                                    </p>
                                <button>inscrivez vous</button>
                            </div>
                        </div>
                        <div className="logimg">
                          <div className="merdrr"><img className='' src="src/assets/image/ken.jpg" alt="" /></div>
                            <div className="textlog">
                                <h3>Localisation</h3>
                                <p>Utilisez notre fonction de localisation pour trouver des vétérinaires dans votre zone.
                                     Des experts à portée de main pour répondre à vos besoins..
                                     Planifiez des consultations directement à travers la plateforme.
                                      .</p>
                                <button className='redd'>localiser maintenant</button>
                            </div>
                        </div>
                        <div className="logimg">
                          <div className="merdrr"><img className='' src="src/assets/image/corne.svg" alt="" /></div>
                            <div className="textlog">
                                <h3>Ventes</h3>
                                <p>
                                Les vétérinaires inscrits fournissent des conseils pratiques et des recommandations pour maintenir la santé optimale de vos animaux. Obtenez des informations sur les maladies.
                                .</p>
                                <button className='redd'>inscrivez vous</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </div>
            
                </div>
            
           
    
    {/* <div className="section__container why__container">
      <div className="why__image">
        <img src="src/assets/image/team-1.jpg" alt="why choose us" />
      </div>
      <div className="why__content">
        <h2 className="section__why__header">Why Choose Us</h2>
        <p>
          With a steadfast commitment to your well-being, our team of highly
          trained healthcare professionals ensures that you receive nothing
          short of exceptional patient experiences.
        </p>
        <div className="why__grid">
          <span><i class="fa-solid fa-location-dot fa-sm"></i></span>
          <div>
            <h4>Intensive Care</h4>
            <p>
              Our Intensive Care Unit is equipped with advanced technology and
              staffed by team of professionals
            </p>
          </div>
          <span><i class="fa-solid fa-notes-medical fa-sm"></i></span>
          <div>
            <h4>Free Ambulance Car</h4>
            <p>
              A compassionate initiative to prioritize your health and
              well-being without any financial burden.
            </p>
          </div>
          <span><i class="fa-solid fa-cart-shopping fa-sm"></i></span>
          <div>
            <h4>Medical and Surgical</h4>
            <p>
              Our Medical and Surgical services offer advanced healthcare
              solutions to address medical needs.
            </p>
          </div>
        </div>
      </div>
    </div> */}
           
             <Footer></Footer>
        </div>
        
        </>
    );
}
 
export default Acceuil;