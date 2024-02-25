import React from 'react';
import '../css/admin.css';
import { useEffect } from 'react';
import "../css/notifier.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accountService } from '../service/account.service';
import 'material-icons/iconfont/material-icons.css';
import ListeRendezVous from '../recommander/ListeRendezVous';
import { useState } from 'react';
import NotifieRendez from '../recommander/NotifieRendez';
import Recommander from '../composantAdmin/listeRcom';
import { Link } from 'react-router-dom';
const Veterinaire = () => {
  
    const [recomVisible, setVisible] = useState(false);
    const toggleRecom = () => {
        setVisible(!recomVisible);
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

const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
       
            const response = await fetch('http://localhost:8000/api/notifieEleveur', {
              headers: {
                Authorization: `Bearer ${token}`, // Assurez-vous d'ajuster ceci en fonction de votre authentification
              },
            });
    
            const data = await response.json();
          //   const filteredNotifications = data.notifications.filter(notification => {
          //     return notification.data.veterinaire_id === user.id;
          // });
          // setNotifications(filteredNotifications);
            console.log(data)
            setNotifications(data);
            setNotifications(data);
            setUnreadCount(data.filter(notification => !notification.read).length);
      
        };
    
        fetchNotifications();
      }, []); 
      const handleOpen = () => {
        // Afficher les notifications non lues
        notifications.forEach((notification) => {
          toast(notification.data.message);
        });
    
        // Mettre à jour le nombre de notifications non lues à zéro
        // setUnreadCount(0);
      };



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
               
                
               
               <Link to="" >
                   <span class="material-icons-sharp" onClick={toggleListe}>
                       insights
                   </span>
                   <h3>Rendez-vous</h3>
               </Link>
               {/* <Outlet></Outlet> */}
               <Link To="" className={menuSelected === 'liste' ? 'active' : ''} onClick={() => handleMenuClick('liste')}>
                   <span className="material-icons-sharp">
                       mail_outline
                   </span>
                   <h3>Notifications</h3>
                   
                   {unreadCount > 0 && (
                   <span className="message-count"  onClick={handleOpen}>
                
          {unreadCount}
          <ToastContainer />
                   </span>
                       )}
                   </Link>
               <Link to="">
                   <span className="material-icons-sharp" onClick={toggleRecom}>
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
           <div className='vikk'>Dahbord Veterinaire
           
           </div>
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
                    <ListeRendezVous></ListeRendezVous>
                  )}
                  {recomVisible && (
                    <Recommander></Recommander>
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

export default Veterinaire;
