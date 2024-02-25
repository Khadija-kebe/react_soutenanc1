import React from 'react';
import '../css/admin.css';
import { useState ,useEffect } from 'react';
import Chart from './chart';
import 'material-icons/iconfont/material-icons.css';
import { Link } from 'react-router-dom';
import Anime from '../composantAdmin/animadmin';
import AdminAnimaux from './AdminAnimaux';
import AdminRecomandation from './adminRecomandation';
const Admin = () => {

    const [listeAnime, setListeAnime] = useState(false);
    const toggleAnime = () => {
      setListeAnime(!listeAnime);
    };

    const [listeRecom, setListeRecom] = useState(false);
    const toggleRecom = () => {
      setListeRecom(!listeRecom);
    };

  const [listeVisible, setListeVisible] = useState(false);
  const toggleListe = () => {
    setListeVisible(!listeVisible);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);
const [isDarkMode, setDarkMode] = useState(false);

const toggleMenu = () => {
  setMenuOpen(!isMenuOpen);
};

const closeMenu = () => {
  setMenuOpen(false);
};

const toggleDarkMode = () => {
  setDarkMode(!isDarkMode);
}; 

const [menuSelected, setMenuSelected] = useState('dashboard');

const handleMenuClick = (selectedPage) => {
  setMenuSelected(selectedPage);
};

// Utilisez une structure conditionnelle pour déterminer quel composant afficher
let mainContent;
switch (menuSelected) {
  case 'liste':
    // mainContent = <ListeRendezVous />;
    break;
  // case 'usersList':
  //   mainContent = <UsersList />;
  //   break;
  // Ajoutez d'autres cas au besoin pour d'autres pages
  default:
    // mainContent = <ListeRendezVous />;
}


  return (
    <>
      <div className="bodyVete">
    <div className="containervete">
       
       <aside  >
           {/* <div className="toggleVete">
               <div className="logo">
                   <div className='vikkk'>SEN<span className="danger">TROUP'O</span></div>
               </div>
               <div className="close" id="close-btn">
                   <span className="material-icons-sharp">
                       close
                   </span>
               </div>
           </div> */}

           <div className="sidebarre">
               <Link to="" className="active">
                   <span className="material-icons-sharp">
                       dashboard
                </span>
                   <h3 >Dashboard</h3>
               </Link>
               
                
               <Link to="">
                   <span className="material-icons-sharp" onClick={toggleListe}>
                       person_outline
                   </span>
                   <h3>Utilisateurs</h3>
                   
               </Link>
              
              
              
               <Link to="">
                   <span className="material-icons-sharp">
                       receipt_long
                   </span>
                   <h3>Historique</h3>
               </Link>
               <Link to="" >
                   <span class="material-icons-sharp" onClick={toggleAnime}>
                       insights
                   </span>
                   <h3>Publications</h3>
               </Link>
               {/* <Outlet></Outlet> */}
               
               <Link to="">
                   <span className="material-icons-sharp" onClick={ toggleRecom }>
                       inventory
                   </span>
                   <h3> recommandations</h3>
               </Link>
               <Link to="">
                   <span className="material-icons-sharp">
                       report_gmailerrorred
                   </span>
                   <h3>Reports</h3>
               </Link>
               <Link to="">
                   <span className="material-icons-sharp">
                       settings
                   </span>
                   <h3>Parametre</h3>
               </Link>
               
               <Link to="">
                   <span className="material-icons-sharp">
                       logout
                   </span>
                   <h3>Deconnexion</h3>
               </Link>
           </div>
       </aside>
       
       <div className='mainVete'>
           <div className='vikk'>Dahbord Admin</div>
           <div className="kom">
           <ul class="breadcrumbs">
              <li><Link to="/">Acceuil</Link></li>
              
            </ul>
           </div>
          
           <div className="analyseur">
               <div className="saleseur">
                   <div className="stateur">
                      <div className="kahf">
                        <div className="infeur">
                            <h3>Nombres eleveurs</h3>
                            <h1 className='infoh1a'>40</h1>
                        </div>
                        <div className="progresseur">
                            <svg>
                                <circle cx="38" cy="38" r="36"></circle>
                            </svg>
                            <div className="percentage">
                                <p>+31%</p>
                            </div>
                        </div>
                       </div>
                   </div>
               </div>
               <div className="visits">
                   <div className="stateur">
                   <div className="kahf">
                       <div className="infeur">
                           <h3>Nbres Veterinaires</h3>
                           <h1 className='infoh1a'>24</h1>
                       </div>
                       <div className="progresseur">
                           <svg>
                               <circle cx="38" cy="38" r="36"></circle>
                           </svg>
                           <div className="percentage">
                               <p>20%</p>
                           </div>
                       </div>
                       </div>
                   </div>
               </div>
               <div className="searches">
                   <div className="stateur">
                   <div className="kahf">
                       <div className="infeur">
                           <h3>Nombres Publications</h3>
                           <h1 className='infoh1a'>20</h1>
                       </div>
                       <div className="progresseur">
                           <svg>
                               <circle cx="38" cy="38" r="36"></circle>
                           </svg>
                           <div className="percentage">
                               <p>+21%</p>
                           </div>
                       </div>
                       </div>
                   </div>
               </div>
               <div className="searches">
                   <div className="stateur">
                   <div className="kahf">
                       <div className="infeur">
                           <h3>Nombres Publications</h3>
                           <h1 className='infoh1a'>20</h1>
                       </div>
                       <div className="progresseur">
                           <svg>
                               <circle cx="38" cy="38" r="36"></circle>
                           </svg>
                           <div className="percentage">
                               <p>+21%</p>
                           </div>
                       </div>
                       </div>
                   </div>
               </div>
           </div>
          
           <div>
               {listeVisible && (
                    <Anime></Anime>
                  )}
               </div>
               <div>
               {listeAnime && (
                    <AdminAnimaux ></AdminAnimaux >
                  )}
               </div>

               <div>
               {listeRecom && (
                    <AdminRecomandation  ></AdminRecomandation  >
                  )}
               </div>
          
           {/* <Anime></Anime> */}

       </div>
       
       <div className="right-section">
           <div className="nav">
               <button id="menu-btn">
                   <span className="material-icons-sharp">
                       menu
                   </span>
               </button>
               {/* <div className="dark-mode" onClick={toggleDarkMode}>
                   <span className={`material-icons-sharp ${isDarkMode ? 'active' : ''}`}>
                       light_mode
                   </span>
                   <span className={`material-icons-sharp ${isDarkMode ? '' : 'active'}`}>
                       dark_mode
                   </span>
               </div> */}
               

               <div className="profile">
                   <div className="infeur">
                       <p>Hey, <b>Reza</b></p>
                       <small className="text-muted">admin</small>
                   </div>
                   
                   <div className="profile-photo">
                       <img className='imgdesVete' src="src/assets/image/profile-1.jpg" alt="" />
                   </div>
               </div>

           </div>
         
            

       </div>

      
   </div>
    </div>
   
    
  
    </>
  )
}

export default Admin;
