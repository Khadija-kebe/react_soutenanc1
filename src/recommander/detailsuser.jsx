import '../recommander/usersdet.css'
import { accountService } from '../service/account.service';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
const Userdetail = ({ product, onClose }) => {
  
    const [recuperation, setRecuperation] = useState({});
    const token = localStorage.getItem('token');
    const { id } = useParams();
    async function recuper() {
      const url = `http://localhost:8000/api/userlistee${id}`;
      const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
      });
      const response = await data.json();
      setRecuperation(response);
    }
  
    useEffect(() => {
      recuper();
    }, [id]);
    return (
        <>
          <i class="fa-solid fa-xmark"></i>
        <div className="detusers">
      
            <div className="detailser">
                <div className="photo">
                    <div className="photosp">
                     <img className='' src="src/assets/image/ken.jpg" alt="" />
                     <h4> {product.prenom}{product.nom}</h4>
                      
                    </div>
                    
                    <div className="adress">
                            <span><i class="fa-regular fa-user"></i></span>
                            <span>{product.profil}</span>
                        </div>
                        <div className="adress">
                            <span><i class="fa-regular fa-address-book"></i></span>
                            <span>{product.adresse}</span>
                        </div>
                        <div className="adress">
                            <span><i class="fa-solid fa-phone"></i></span>
                            <span>{product.NumeroTelephone}</span>
                        </div>
                        <div className="adress">
                            <span><i class="fa-regular fa-envelope"></i></span>
                            <span>{product.email}</span>
                        </div>
                        
                   
                </div>
               
            </div>
            <div className="redeur">
                    <button onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
                    </div>
        </div>
        </>
      );
}
 
export default Userdetail;