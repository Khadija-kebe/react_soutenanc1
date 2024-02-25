import React ,{ useState, useEffect } from 'react'
import { accountService } from '../service/account.service';
import "../css/notifier.css"
import { FaBell } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NotifieRendez() {
    const [notifications, setNotifications] = useState([]);
    const [rendezVous, setrendezVous] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
       
            const response = await fetch('http://localhost:8000/api/notifiRendez', {
              headers: {
                Authorization: `Bearer ${token}`, // Assurez-vous d'ajuster ceci en fonction de votre authentification
              },
            });
    
            const data = await response.json();
            console.log(data)
        
            setNotifications(data.notifications);
            setrendezVous(data.notifications.filter(notification => !notification.read).length);
      
        };
    
        fetchNotifications();
      }, []);
      const handleOpen = () => {
        // Afficher les notifications non lues
        
        notifications.forEach((notification) => {
          toast(notification.message);
          
        });
    
        // Mettre à jour le nombre de notifications non lues à zéro
        setrendezVous(0);
      };
  return (
    <>
     <div className="notification-icon" onClick={handleOpen}>
        <FaBell />
        {rendezVous > 0 && (
          <span className="notification-badge">{rendezVous}</span>
        )}
      </div>

      <ToastContainer />
    
    </>
  )
}

export default NotifieRendez