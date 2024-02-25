import React from 'react';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './dashbord/admin';
import Eleveur from './dashbord/dashbordeleveur';
import Acceuil from './page/acceuil';
import Boutique from './page/boutique';
import Ajoutanimal from './page/ajoutanimal';
import Recommandation from './recommander/recommande';
import Login from './page/login';
import Detail from './page/detail';
import Veterinaire from './dashbord/veteriraire';
import Panier from './page/panier';
import CommandeValidation from './page/commande';
import SanteAnimal from './page/santeAnimal';
import Userdetail from './recommander/detailsuser';
import Contour from './recommander/contour';
import Modifier from './recommander/edit';
import Rendez from './page/rendezvous';
import Rendezvous from './page/detailRendezvous';
import IMAGE from './recommander/santecom';
import Anime from './composantAdmin/animadmin';
import CommandesListe from './composantAdmin/listecommande';
import Detailrecomme from './page/detailrecomme';
import Autre from './page/autre';
import AdminAnimaux from './dashbord/AdminAnimaux';
import AdminRecomandation from './dashbord/adminRecomandation';
import Video from './page/video';
import Shopping from './page/shopping';
function App() {

  return (
   
    
        <Routes>    
            <Route path="/admin" element={<Admin />} />         
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Acceuil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/eleveur" element={<Eleveur />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/ajout" element={<Ajoutanimal />} />
         
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/commande" element={<CommandeValidation />} />
          <Route path="/sante" element={<SanteAnimal />} />
          <Route path="/veterinaire" element={<Veterinaire />} />
          <Route path="/recom" element={<Recommandation/>} />
          <Route path="/det" element={<Userdetail/>} />
          <Route path="/con" element={<Contour/>} />
          <Route path="/modi/:id" element={<Modifier/>} />
          <Route path="/rend" element={<Rendez/>} />
          <Route path="/rendez/:id" element={<Rendezvous/>} />
          <Route path="/img/:id" element={<IMAGE/>} />
          <Route path="/anime" element={<Anime/>} />
          <Route path="/liste" element={<CommandesListe/>} />
          <Route path="/rome/:id" element={<Detailrecomme/>} />
          <Route path="/aute" element={<Autre/>} />
          <Route path="/anima" element={<AdminAnimaux/>} />
          <Route path="/ret" element={<AdminRecomandation/>} />
          <Route path="/vit" element={<Video/>} />
          <Route path="/ship" element={<Shopping/>} />
         
          
          
          
        </Routes>
     
    
  );
}

export default App;
