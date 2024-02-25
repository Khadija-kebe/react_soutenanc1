import { Link } from 'react-router-dom';
import '../composant/header.css'
import React from 'react';
import { useState,useEffect } from 'react';
import '@fortawesome/fontawesome-free'
import { Modal } from '@mui/material';
import { accountService } from '../service/account.service';
import { useNavigate } from 'react-router-dom';
import Login from '../page/login';
const Header = () => {
    const [cartCount, setCartCount] = useState(0);
    const isAuthenticated = accountService.isLogged();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const handleLogout = () => {
      accountService.logout();
      navigate('');
     
    };

    useEffect(() => {
      const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(initialCart.length);
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const threshold = 100;
      const carooElement = document.querySelector('.caroo');
      const headerElement = document.querySelector('header');
  
      if (carooElement) {
        if (scrollPosition > threshold) {
          carooElement.style.display = 'none';
        } else {
          carooElement.style.display = 'flex';
        }
      }
  
      // Update the header style based on the scroll position
      if (headerElement) {
        headerElement.style.top = scrollPosition > threshold ? '0' : '6%';
      }
    };
  
    const handleAddToCart = async () => {
      // ... (your handleAddToCart logic)
  
      const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(updatedCart.length);
    };
    return ( 
        <>
        <div className='fixe'>
                <div className="caroo">
                    <div className="cor">
                        <div className="email">
                            <span><Link to='' className='vert' ><i class="fa-solid fa-envelope"></i></Link></span>
                            <span>sentroupo@gmail.com</span>
                        </div>
                        <div className="email">
                            <span><Link to='' className='vert'><i class="fa-solid fa-phone"></i></Link></span>
                            <span>sentroupo@gmail.com</span>
                        </div>
                    </div>
                </div>
                <header>
            

                  <div className="logo">
                  {/* <img src="src\assets\image\logo3.svg" alt=""/> */}
                  <h3>SEN-TROUP'O</h3>
                  </div>
                <div>
                <ul className="menu">
                    <li><Link to='/'>Acceuil</Link></li>
                    <li><Link to='/sante'>Sante</Link></li>
                    <li><Link to='/boutique'>Notre Boutique</Link></li>
                    
                </ul>
                </div>
            <div className="iconneheader">
            {/* <div className="conth">
                <Link to='/login' className='fo'><i class="fa-solid fa-magnifying-glass fa-lg"></i></Link>
                </div> */}
                <div className="conth">
                  <Link to='/panier' className='fo' onClick={handleAddToCart}>
                      <i className="fa-solid fa-cart-shopping fa-lg"></i>
                  </Link>
                  {cartCount > 0 && (
                      <span className="cart-notification">{cartCount}</span>
                  )}
               </div>
                <div className="conth">
                  {isAuthenticated ? ( 
                    <div className='rund'>
                    <div><Link to='' onClick={handleLogout} className='foo'><i class="fa-solid fa-user fa-lg"></i></Link></div>
                        <div>deconnexion</div> 
                    </div>
                    
                    ) : (
                      <div className='rund'>
                      <div><i class="fa-solid fa-user fa-lg" onClick={handleOpen}></i></div>
                      <div>se connecter</div>
                  </div>
                    )}

                </div>
                
                
                
            </div>
                </header>
        </div>
        <Modal
        className="custom-modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Login></Login>
            </Modal>
        </>
     );
}
 
export default Header;