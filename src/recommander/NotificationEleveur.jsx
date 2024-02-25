import React ,{ useState, useEffect } from 'react'
import { accountService } from '../service/account.service';
import "../css/notifier.css"
import { FaBell } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NotificationEleveur() {
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
        setUnreadCount(0);
      };
  return (
   <>
    {/* <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.data.message}</li>
        ))}
      </ul>
    </div> */}
     <div className="notification-icon" onClick={handleOpen}>
        <FaBell />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>

      <ToastContainer />
   </>
  )
}

export default NotificationEleveur