import '../composantAdmin/anim.css'
// import { Modal } from '@mui/material';
import { accountService } from '../service/account.service';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Modal } from '@mui/material';
import Userdetail from '../recommander/detailsuser';
const Anime = () => {
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
    const token = localStorage.getItem('token'); 
    const [Affichage, setAffichage] = useState([]);
    const [loading, setloading] = useState(false);
  
    useEffect(() =>{
        getTodos();
      }, []);
  
    async function getTodos() {
        setloading(true);
        const url ="http://localhost:8000/api/userliste";
        const data = await fetch(url
            ,{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                  },
                
            });
        const response = await data.json();
        setAffichage(response);
        console.log(response.status);
        setloading(false);
    
        
       }
    return (
        <>
        <div>
            <div className="card-list">
                    {Affichage.map((product) => (
                    <div className="card-item" key={product.id}>
                            <img
                                    src={'http://127.0.0.1:8000/storage/' + product.image}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                    
                        <h6>{product.prenom} {product.nom} </h6>
                        <p>{product.profil}</p>
                               <div className="coderr">
                                   <div  onClick={() => handleOpenModal(product)}>
                                   
                                    <img className='' src="src/assets/image/kem.svg" alt="" />
                                       
                                    </div>
                                    <div >
                                    {/* <Link className='rond'  to={`/modi/${product.id}`}> */}
                                    <i class="fa-solid fa-eye-slash"  ></i>
                                   
                                        {/* </Link> */}
                                    </div>
                                    
                                    </div>
                    </div>
                    ))}
           </div>
           </div>

           <Modal open={openModal} onClose={handleCloseModal}>
           <Userdetail product={selectedProduct} onClose={handleCloseModal} />
          </Modal>
        </>
      );
}
 
export default Anime;